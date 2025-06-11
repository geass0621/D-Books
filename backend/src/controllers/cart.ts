import { NextFunction, RequestHandler, Request, Response } from "express";
import mongoose from 'mongoose';
import User from "../models/user";
import Book from "../models/book";

export const postValidateCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const clientCart = req.body;
  const userId = req.userId;

  // Validate the cart structure
  if (!clientCart || !clientCart.userId || !clientCart.userEmail || !Array.isArray(clientCart.items)) {
    res.status(400).json({
      message: 'Invalid cart structure. Please provide a valid cart.',
    });
    return;
  }

  // fetch the existing cart from the database
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: 'User not found. Please log in.',
      });
      return;
    }

    // validate client cart against the database cart
    if (user.cart?.userId !== clientCart.userId || user.cart?.userEmail !== clientCart.userEmail) {
      res.status(400).json({
        message: 'Cart user ID or email does not match the logged-in user.',
      });
      return;
    }

    // validate cart items with the database

    // Check for valid MongoDB ObjectIds first
    if (!clientCart.items.every((item: { bookId: string }) => mongoose.Types.ObjectId.isValid(item.bookId))) {
      res.status(400).json({
        message: 'Some book IDs in the cart are not valid.',
      });
      return;
    }
    const bookIds = clientCart.items.map((item: { bookId: string; }) => item.bookId);
    const dbBooks = await Book.find({ _id: { $in: bookIds } });

    // Check if all books in the cart exist in the database
    if (!dbBooks || dbBooks.length !== clientCart.items.length) {
      res.status(400).json({
        message: 'Some books in the cart do not exist in the database.',
      });
      return;
    }

    let totalPrice = 0;
    let totalQuantity = 0;
    for (const book of dbBooks) {
      const cartItem = clientCart.items.find((item: { bookId: string; }) => item.bookId === book.id);
      if (cartItem) {
        // Calculate the total price and quantity
        const discountedPrice = Number((book.price - (book.price * (book.discount || 0))).toFixed(2));
        totalPrice += discountedPrice * cartItem.quantity;
        totalQuantity += cartItem.quantity;

        // Update the cart item with the correct details
        cartItem.name = book.name;
        cartItem.imageUrl = book.imageUrl;
        cartItem.price = Number(book.price.toFixed(2));
        cartItem.discountPrice = discountedPrice;
        cartItem.author = book.author;
      } else {
        res.status(400).json({
          message: `Book with ID ${book.id} is not in the cart.`,
        });
        return;
      }
    };

    const roundedTotalPrice = Number(totalPrice.toFixed(2));
    const roundedClientTotalPrice = Number(clientCart.totalPrice.toFixed(2));
    if (roundedTotalPrice !== roundedClientTotalPrice || totalQuantity !== clientCart.totalQuantity) {
      res.status(400).json({
        message: 'Cart totals do not match. Please check the cart items.',
      });
      return;
    }

    // Update the user's cart in the database
    user.cart = {
      userId: clientCart.userId,
      userEmail: clientCart.userEmail,
      items: clientCart.items,
      totalPrice: Number(totalPrice.toFixed(2)),
      totalQuantity: totalQuantity,
      isSync: true, // Mark the cart as synchronized
    };

    await user.save();

    // Respond with success
    res.status(200).json({
      message: 'Cart validated successfully!',
      cart: user.cart,
      success: true,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;

  // Fetch the user from the database
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: 'User not found. Please log in.',
      });
      return;
    }
    // Check if the user has a cart
    if (!user.cart) {
      res.status(404).json({
        message: 'Cart not found for this user.',
      });
      return;
    }
    // Respond with the user's cart
    res.status(200).json({
      message: 'Cart retrieved successfully.',
      cart: user.cart,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

export const postSyncCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const clientCart = req.body;

  // Validate the cart structure
  if (!clientCart || !clientCart.userId || !clientCart.userEmail || !Array.isArray(clientCart.items)) {
    res.status(400).json({
      message: 'Invalid cart structure. Please provide a valid cart.',
    });
    return;
  }

  if (clientCart.totalPrice === undefined ||
    clientCart.totalQuantity === undefined ||
    clientCart.totalPrice < 0 ||
    clientCart.totalQuantity < 0) {
    res.status(400).json({
      message: 'Invalid cart totals. Please provide valid total price and quantity.',
    });
    return;
  }

  try {
    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: 'User not found. Please log in.',
      });
      return;
    }

    // Update the user's cart in the database
    user.cart = {
      userId: clientCart.userId,
      userEmail: clientCart.userEmail,
      items: clientCart.items,
      totalPrice: Number(clientCart.totalPrice.toFixed(2)),
      totalQuantity: clientCart.totalQuantity,
      isSync: true, // Mark the cart as synchronized
    };

    await user.save();

    // Respond with success
    res.status(200).json({
      message: 'Cart synchronized successfully!',
      cart: user.cart,
      success: true,
    });

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}



import Book from '../models/book';
import { RequestHandler } from 'express';
import { CustomHttpError } from '../models/customError';
import Order from '../models/order';



export const postBook: RequestHandler = async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const author = req.body.author;
  const price = +req.body.price;
  const discount = +req.body.discount;
  const imageUrl = req.body.imageUrl;

  const newBook = new Book({
    name: name,
    description: description,
    author: author,
    price: price,
    discount: discount,
    imageUrl: imageUrl
  });

  try {
    const book = await newBook.save();
    res.status(201).json({ message: 'Book added successfully!', book: book });

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export const updateBook: RequestHandler = async (req, res, next) => {
  const bookId = req.params.bookId;
  const name = req.body.name;
  const description = req.body.description;
  const author = req.body.author;
  const price = +req.body.price;
  const discount = +req.body.discount;
  let imageUrl = req.body.imageUrl;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      const error = new CustomHttpError('Could not find book!', 404, {});
      throw error;
    }
    book.name = name;
    book.description = description;
    book.author = author;
    book.price = price;
    book.discount = discount;
    book.imageUrl = imageUrl;
    const updatedBook = await book.save();
    res.status(200).json({ message: 'Book updated!', book: updatedBook });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

export const deleteBook: RequestHandler = async (req, res, next) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      const error = new CustomHttpError('Could not find post!', 404, {});
      throw error;
    }

    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: 'Post deleted successfully!', book: book });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getAdminOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (!orders) {
      const error = new CustomHttpError('No orders found!', 404, {});
      throw error;
    }
    if (orders.length === 0) {
      res.status(200).json({ message: 'No orders found.', orders: [] });
      return;
    }
    res.status(200).json({ message: 'Orders fetched successfully!', orders: orders });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
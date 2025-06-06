import Book from '../models/book';
import e, { RequestHandler } from 'express';
import { CustomHttpError } from '../models/customError';
import Order from '../models/order';
import { validationResult } from 'express-validator';



export const postBook: RequestHandler = async (req, res, next) => {
  const validationsErrors = validationResult(req);
  if (!validationsErrors.isEmpty()) {
    let errors: any[] = [];
    validationsErrors.array().map(el => errors.push(el.msg));
    res.status(422).json({ message: '', errors: errors });
    return;
  }

  const name = req.body.name;
  const genre = req.body.genre;
  const description = req.body.description;
  const author = req.body.author;
  const price = +req.body.price;
  const discount = +req.body.discount;
  const imageUrl = req.body.imageUrl;

  const newBook = new Book({
    name: name,
    description: description,
    genre: genre.toLowerCase(),
    author: author,
    price: price,
    discount: discount,
    imageUrl: imageUrl
  });

  try {
    const book = await newBook.save();
    res.status(201).json({ message: 'Book added successfully!', book: book, success: true });

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export const updateBook: RequestHandler = async (req, res, next) => {
  const validationsErrors = validationResult(req);
  if (!validationsErrors.isEmpty()) {
    let errors: any[] = [];
    validationsErrors.array().map(el => errors.push(el.msg));
    res.status(422).json({ message: '', errors: errors });
    return;
  }

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
    res.status(200).json({ message: 'Book updated!', book: updatedBook, success: true });
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
    res.status(200).json({ message: 'Book deleted successfully!', book: book, success: true });
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
      res.status(200).json({ message: 'No orders found.', orders: [], success: true });
      return;
    }
    res.status(200).json({ message: 'Orders fetched successfully!', orders: orders });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const patchOrderStatus: RequestHandler = async (req, res, next) => {
  const orderId = req.params.orderId;
  const status = req.body.status;
  const validationsErrors = validationResult(req);
  if (!validationsErrors.isEmpty()) {
    let errors: any[] = [];
    validationsErrors.array().map(el => errors.push(el.msg));
    res.status(422).json({ message: '', errors: errors });
    return;
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new CustomHttpError('Could not find order!', 404, {});
      throw error;
    }
    order.status = status;
    const updatedOrder = await order.save();
    res.status(200).json({ message: 'Order status updated!', order: updatedOrder, success: true });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new CustomHttpError('Could not find order!', 404, {});
      throw error;
    }
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Order deleted successfully!', order: order, success: true });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
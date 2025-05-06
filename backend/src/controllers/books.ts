import Book from '../models/book';
import { RequestHandler } from 'express';



export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const books = await Book.find()
    res.status(200).json({ message: "All books!", books: books });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

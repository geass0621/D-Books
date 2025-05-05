import Book from '../models/book';
import { RequestHandler } from 'express';

const books: any[] = [];

export const getBooks: RequestHandler = async (req, res, next) => {
  res.status(200).json({ books: books })
}

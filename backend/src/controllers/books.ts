import Book from '../models/book';
import { NextFunction, RequestHandler, Request, Response } from 'express';
import { CustomHttpError } from '../models/customError';
import mongoose from 'mongoose';

export const getBooks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const genre = req.query.genre as string;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
  const sort = req.query.sort as string || 'name';
  const sortOrder = req.query.sortOrder as string || 'asc';
  const search = req.query.search as string || '';

  try {
    let filter: any = {};
    if (genre && genre !== 'all') {
      filter.genre = genre.toLowerCase();
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    const totalBooks = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .sort({ [sort]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);


    const responseBooks = books.map(book => ({
      id: book._id.toString(),
      name: book.name,
      genre: book.genre,
      author: book.author,
      description: book.description,
      imageUrl: book.imageUrl,
      price: book.price,
      discount: book.discount
    }));


    res.status(200).json({
      message: 'Books fetched successfully!',
      books: responseBooks,
      totalBooks: totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: Number(page)
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export const getBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;
  // Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(404).json({
      message: 'Book not found!',
      success: false
    });
    return;
  }
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        message: 'Book not found!',
        success: false
      });
      return;
    }
    const responseBook = {
      id: book._id.toString(),
      name: book.name,
      genre: book.genre,
      author: book.author,
      description: book.description,
      imageUrl: book.imageUrl,
      price: book.price,
      discount: book.discount
    };

    res.status(200).json({
      message: 'Book fetched successfully!',
      book: responseBook,
      success: true
    });

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

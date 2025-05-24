import Book from '../models/book';
import { RequestHandler } from 'express';
import { CustomHttpError } from '../models/customError';



export const getBooks: RequestHandler = async (req, res, next) => {
  const genre = req.query.genre as string;
  console.log('Genre:', genre);
  try {
    let books;
    if (genre === 'all') {
      // books = await Book.find().sort({ createdAt: -1 });
      res.status(200).json({ message: 'All books fetched successfully!', books: [] });
      return;
    }
    if (genre) {
      books = await Book.find({ genre: genre.toLowerCase() }).sort({ createdAt: -1 });
    }

    if (!books || books.length === 0) {
      const error = new CustomHttpError('No books found for the specified genre.', 404, {});
      throw error;
    }

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


    res.status(200).json({ message: 'Books fetched successfully!', books: responseBooks });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

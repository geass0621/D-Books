import Book from '../models/book';
import { RequestHandler } from 'express';
import { CustomHttpError } from '../models/customError';



export const getBooks: RequestHandler = async (req, res, next) => {
  const genre = req.query.genre as string;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
  const sort = req.query.sort as string || 'name';
  const sortOrder = req.query.sortOrder as string || 'asc';
  console.log('Genre:', genre);
  console.log('Page:', page);
  console.log('Limit:', limit);
  console.log('Sort:', sort);
  console.log('Sort Order:', sortOrder);
  try {
    let filter: any = {};
    if (genre && genre !== 'all') {
      filter.genre = genre.toLowerCase();
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

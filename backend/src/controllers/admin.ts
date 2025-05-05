import Book from '../models/book';
import { RequestHandler } from 'express';


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
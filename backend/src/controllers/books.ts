import { Request, Response, NextFunction } from 'express';

interface GetBooksRequest extends Request { }
interface GetBooksResponse extends Response { }
interface GetBooksNextFunction extends NextFunction { }

const books: any[] = [];

export function getBooks(req: GetBooksRequest, res: GetBooksResponse, next: GetBooksNextFunction): void {
  res.status(200).json({ books: books });
};

export function postBook(req: GetBooksRequest, res: GetBooksResponse, next: GetBooksNextFunction): void {

}
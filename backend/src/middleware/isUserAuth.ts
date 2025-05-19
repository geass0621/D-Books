import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { CustomHttpError } from '../models/customError';

export const isUserAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new CustomHttpError('Not authenticated', 401);
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.USER_JWT_SECRET as string);
  } catch (err: any) {
    err.statusCode = 500;
    throw err;
  };

  if (!decodedToken) {
    const error = new CustomHttpError('Not authenticated', 401);
    throw error;
  };

  next();

}
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { CustomHttpError } from '../models/customError';

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const isUserAuth: RequestHandler = (req, res, next) => {
  // Try to get token from cookie first
  let token = req.cookies?.token;

  if (!token) {
    const error = new CustomHttpError('Not authenticated', 401, {});
    throw error;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.USER_JWT_SECRET as string);
  } catch (err: any) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new CustomHttpError('Not authenticated', 401, {});
    throw error;
  }
  req.userId = (decodedToken as any).userId;
  next();
}
import { NextFunction, RequestHandler, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { CustomHttpError } from '../models/customError';

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role?: string;
    }
  }
}


export const isAuth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  // Try to get token from cookie first
  let token = req.cookies?.token;

  if (!token) {
    const error = new CustomHttpError('Not authenticated', 401, {});
    throw error;
  }

  let decodedToken;
  // Try USER_JWT_SECRET first
  try {
    decodedToken = jwt.verify(token, process.env.USER_JWT_SECRET as string);
  } catch (errUser) {
    // If fails, try ADMIN_JWT_SECRET
    try {
      decodedToken = jwt.verify(token, process.env.ADMIN_JWT_SECRET as string);
    } catch (errAdmin) {
      // If both fail, not authenticated
      const error = new CustomHttpError('Not authenticated', 401, {});
      throw error;
    }
  }

  if (!decodedToken) {
    const error = new CustomHttpError('Not authenticated', 401, {});
    throw error;
  }

  req.userId = (decodedToken as any).userId;
  req.role = (decodedToken as any).role;
  next();
}
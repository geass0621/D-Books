import { NextFunction, RequestHandler, Request, Response } from "express";
import { CustomHttpError } from '../models/customError';

const isAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  // Check if user is authenticated
  if (!req.userId || !req.role) {
    const error = new CustomHttpError('Not authenticated', 401, {});
    return next(error);
  }

  // Check if user is an admin
  if (req.role !== 'admin') {
    const error = new CustomHttpError('Not authorized', 403, {});
    return next(error);
  }

  next();
}

export default isAdmin;
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const defaultErrorResponse: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status)
    .json({
      message: message,
      data: data
    });
}; 
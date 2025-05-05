import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
  data?: any;
}

export function defaultErrorResponse(
  error: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status)
    .json({
      message: message,
      data: data
    });
};
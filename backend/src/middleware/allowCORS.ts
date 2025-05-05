import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request { }
interface CustomResponse extends Response { }
interface CustomNextFunction extends NextFunction { }

export function allowCORS(req: CustomRequest, res: CustomResponse, next: CustomNextFunction): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}


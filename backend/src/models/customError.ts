export class CustomHttpError extends Error {
  statusCode: number;
  data: object

  constructor(message: string, statusCode: number, data: object) {
    super(message);
    this.statusCode = statusCode;
    this.data = data
  }
}
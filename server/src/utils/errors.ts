import { Response } from 'express';

export enum HttpStatus {
  internalError = 500,
  badRequest = 400,
  notFound = 404,
}

export class AppError extends Error {
  status: HttpStatus = 400;
  message: string = '';

  constructor(status: HttpStatus, message: string, err?: Error | unknown) {
    super(message);
    this.status = status;
    this.message = message;

    if (err) {
      console.log(err);
    }
  }
}

export const sendError = (res: Response, err: AppError | Error) => {
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.message });
  }

  return res.status(HttpStatus.internalError).json({
    status: HttpStatus.internalError,
    message: 'error occurred while processing request',
  });
};

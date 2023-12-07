/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went Wrong';
  return res.status(statusCode).send({
    success: false,
    message,
    err: err,
  });
};

export default globalErrorHandler;

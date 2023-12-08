/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { handleZodError } from '../errors/handleZodError';
import { TErrorSource } from '../interface/error';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next,
) => {
  // setting default value
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went Wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went Wrong',
    },
  ];

 

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).send({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV==='development'? err?.stack: null

  });
};

export default globalErrorHandler;

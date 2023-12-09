/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import { handleCastError } from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
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
  let statusCode =  500;
  let message =  'Something went Wrong';

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
  }else if(err?.message==='ValidationError'){
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;

  }else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } 
   else if (err instanceof AppError) {
    
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path:'',
        message:err?.message
      }
    ]
  } 
   else if (err instanceof Error) {
    
    message = err?.message;
    errorSources = [
      {
        path:'',
        message:err?.message
      }
    ]
  } 

  return res.status(statusCode).send({
    success: false,
    statusCode,
    message,
    errorSources,
    stack: config.NODE_ENV==='development'? err?.stack: null

  });
};

export default globalErrorHandler;

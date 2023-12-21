import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED,'You are not a authorized');
    }

    next();
  });
};
export default auth;

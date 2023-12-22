import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TuserRole } from '../models/user/user.interface';
import { User } from '../models/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //check if the token is send from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not a authorized');
    }

    // check if the token is valid
    const decoded = jwt.verify(token, config.jwt_access_serect as string) as JwtPayload;
    const {role,userId,iat}= decoded;

     // if the user is exists

  const user = await User.isUserExistsByCustomID(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not Found');
  }

  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  if(user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt,iat as number)){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not a authorized user');

  }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not a authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;

import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendEmail } from '../../utils/sendEmail';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import createToken from './auth.utils';
const loginUser = async (payload: TLoginUser) => {
  // if the user is exists

  const user = await User.isUserExistsByCustomID(payload?.id);
  console.log(user);
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

  // checking password
  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }

  // create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const assessToken = createToken(
    jwtPayload,
    config.jwt_access_serect as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_serect as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    assessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  // if the user is exists

  const user = await User.isUserExistsByCustomID(userData?.userId);

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

  // checking password
  if (!(await User.isPasswordMatch(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }
  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_serect as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;

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
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not a authorized user',
    );
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const assessToken = createToken(
    jwtPayload,
    config.jwt_access_serect as string,
    config.jwt_access_expires_in as string,
  );

  return {
    assessToken,
  };
};

const forgetPassword = async (userId: string) => {
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
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_serect as string,
    '10m',
  );
  const resetUILink= `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`
  sendEmail(user.email,resetUILink);

  console.log(resetUILink);
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};

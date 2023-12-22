import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const {refreshToken,assessToken, needsPasswordChange}= result;
  res.cookie('refreshToken',refreshToken,{
    secure: config.NODE_ENV==='production',
    httpOnly:true,
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user Logged in successfully',
    data: {
      assessToken,
      needsPasswordChange
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  console.log(passwordData);
  const result = await AuthServices.changePassword(req.user, passwordData);
 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully',
    data: result,
  });
});


const refreshToken= catchAsync(async (req,res)=>{
  const {refreshToken}= req.cookies;
  const result= await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is Retrieved Successfully',
    data: result,
  });
})

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken
};

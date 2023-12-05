/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, student: StudentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      StudentData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is Created successfully',
      data: result,
    });
  },
);

export const UserControllers = {
  createStudent,
};

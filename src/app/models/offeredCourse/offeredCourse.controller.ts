import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'offered Course Created Successfully',
    data: result,
  });
});

export const offeredCourseController= {
    createOfferedCourse,
}
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { enrolledCourseService } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId=req.user.userId;
  const result= await  enrolledCourseService.createEnrolledCourseIntoDB(userId,req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Successfully created enrollment',
    data: result,
  });
});

export const enrolledCoursesControllers={
    createEnrolledCourse,
}
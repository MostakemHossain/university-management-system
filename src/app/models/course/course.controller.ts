import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});
const getSingleCourses = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(Id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(Id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(Id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Assign Faculties  is updated successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(Id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourses,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse
};

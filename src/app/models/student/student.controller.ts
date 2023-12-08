/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrived successfully',
    data: result,
  });
});

const getASingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.getASingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrived successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted Successfully',
    data: result,
  });
});


const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const {student}= req.body;
  const result = await StudentServices.updateStudentFromDB(studentId,student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Updated Successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getASingleStudent,
  deleteStudent,
  updateStudent
};

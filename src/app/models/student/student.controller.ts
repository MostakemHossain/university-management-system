import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';




const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Students are retrived successfully',
      data:result,
    })
  } catch (err) {
   next(err);
  }
};

const getASingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getASingleStudentFromDB(studentId);
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Student is retrived successfully',
      data:result,
    })
  } catch (err) {
   next(err)
  }
};
const deleteStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student deleted Successfully',
    data:result,
  })
  } catch (err) {
    next(err);
  }
};

export const StudentController = {
  getAllStudents,
  getASingleStudent,
  deleteStudent,
};

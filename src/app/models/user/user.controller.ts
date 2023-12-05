import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const { password,student: StudentData } = req.body;
  
  
      const result = await UserServices.createStudentIntoDB(password,StudentData);
      sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Student is Created successfully',
        data:result,
      })
      
    } catch (err) {
      next(err);
    }
  };


  export const UserControllers={
createStudent
  }
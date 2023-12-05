import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
      const { password,student: StudentData } = req.body;
  
  
      const result = await UserServices.createStudentIntoDB(password,StudentData);
  
      res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went Wrong',
        error: err,
      });
    }
  };


  export const UserControllers={
createStudent
  }
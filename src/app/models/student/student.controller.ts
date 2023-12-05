import { Request, Response } from 'express';
import { StudentServices } from './student.service';




const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrived successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went Wrong',
      error: err,
    });
  }
};

const getASingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getASingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went Wrong',
      error: err,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  getAllStudents,
  getASingleStudent,
  deleteStudent,
};

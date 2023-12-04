import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { StudentValidationSchema } from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;

    // validateDataUsingZod
    const validateData= StudentValidationSchema.studentValidationSchema.parse(StudentData);

    const result = await StudentServices.createStudentIntoDB(validateData);

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
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getASingleStudent,
};

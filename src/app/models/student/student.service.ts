import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const getASingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
    .populate('user');
  // const result = Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getASingleStudentFromDB,
  deleteStudentFromDB,
};

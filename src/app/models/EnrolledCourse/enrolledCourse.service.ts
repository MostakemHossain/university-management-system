import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Course } from '../course/couse.model';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Student } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import mongoose from 'mongoose';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  console.log(userId, payload);
  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found!');
  }

  if (isOfferedCourseExists?.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is Full!');
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not Found!');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  // check max credits exists

  const semesterRegistration = await SemesterRegistration.findOne(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');

  // total enrolled course+ new Enrolled Course Credit> max Credit

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
        $lookup:{
            from:'courses',
            localField:'course',
            foreignField:'_id',
            as: 'enrollCourseData'
        }
    },
    {
        $unwind:"$enrollCourseData"
    },
    {
        $group:{_id:null,totalEnrolledCredits:{$sum:'$enrollCourseData.credits'}}
    },
    {
     $project:{_id:0,totalEnrolledCredits:1}
    }
  ]);
  console.log(enrolledCourses);
  const totalCredits= enrolledCourses.length>0? enrolledCourses[0].totalEnrolledCredits : 0;
  console.log(totalCredits);
  const course= await Course.findOne(isOfferedCourseExists.course);

  if(totalCredits && semesterRegistration?.maxCredit && totalCredits+course?.credits > semesterRegistration?.maxCredit){
    throw new AppError(httpStatus.BAD_REQUEST, 'You have exceeded maximum number of credits');
  }

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is Already Enrolled!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          isEnrolled: true,
          faculty: isOfferedCourseExists.faculty,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this course',
      );
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const enrolledCourseService = {
  createEnrolledCourseIntoDB,
};

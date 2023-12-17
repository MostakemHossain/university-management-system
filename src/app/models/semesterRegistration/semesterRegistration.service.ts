import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already "UPCOMING"|"ONGOING"
  const isThereAnyUpcomingOROngingSemester = await SemesterRegistration.findOne(
    {
      $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }],
    },
  );
  if (isThereAnyUpcomingOROngingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOROngingSemester.status} registered semester!!`,
    );
  }

  // check is the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found',
    );
  }

  // check is the semsester is  already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is Already Registered',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const updateSemesterRegistrationFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
 
  //check if the requested registered semester exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This semester is not Found!!');
  }

  //if the requested semester registration is ended,we will not update
  // update anything

  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestSemesterStatus = payload?.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestSemesterStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestSemesterStatus}`,
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestSemesterStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestSemesterStatus}`,
    );
  }

  const result= await SemesterRegistration.findByIdAndUpdate(id,payload,{
    new:true,
    runValidators:true,
  })
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
};

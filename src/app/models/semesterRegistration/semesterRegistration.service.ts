import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration, 
) => {
  const academicSemester = payload?.academicSemester;
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

  const result= await  SemesterRegistration.create(payload);
  return result;
};


const getAllSemesterRegistrationFromDB=async(query:Record<string,unknown>)=>{
    const semesterRegistrationQuery=  new QueryBuilder(SemesterRegistration.find().populate('academicSemester'),query).filter().sort().paginate().fields();


    const result= await semesterRegistrationQuery.modelQuery;
    return result;
}
const updateSemesterRegistrationFromDB=async(id:string,)=>{
    

}

const getSingleSemesterRegistrationFromDB= async(id:string)=>{
 
    const result= await SemesterRegistration.findById(id).populate('academicSemester');
    return result;
}


export const semesterRegistrationService={
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationFromDB,
}

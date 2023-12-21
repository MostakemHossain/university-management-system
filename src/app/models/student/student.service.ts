import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { studentSearchAbleField } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query);
  // const queryObj={...query};//copy

  //search term
  // const studentSearchAbleField = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery=Student.find({
  //   $or: studentSearchAbleField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })
  // filtering
  // // const excludeFields=['searchTerm','sort','limit','page','fields'];

  // // excludeFields.forEach(el=> delete queryObj[el]);
  // // const filterQuery =  searchQuery.find(queryObj)
  // //   .populate('admissionSemester')
  // //   .populate({
  // //     path: 'academicDepartment',
  // //     populate: { path: 'academicFaculty' },
  // //   });

  //   let sort= '-createdAt';
  //   if(query.sort){
  //     sort=query.sort as string;
  //   }
  //   const sortQuery=  filterQuery.sort(sort);

  //   let limit =1;
  //   let page=1;
  //   let skip=1;
  //   if(query.limit){
  //     limit=Number(query.limit);
  //   }
  //   if(query.page){
  //     page=Number(query.page);
  //     skip=(page-1)*limit
  //   }

  //   const paginateQuery=  sortQuery.skip(skip);

  //   const limitQuery= paginateQuery.limit(limit);

  //   // field limiting
  //   let fields= '-__v';
  //   if(query.fields){
  //     fields= (query.fields as string).split(',').join(' ');
  //     console.log({fields})

  //   }
  //   const fieldQuery= await limitQuery.select(fields);

  //   return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
    .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
      }),
    query,
  )
    .search(studentSearchAbleField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getASingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
    .populate('user');
  // const result = Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
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

    // get user id deleted_student
    const userId = deletedStudent._id;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getASingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};

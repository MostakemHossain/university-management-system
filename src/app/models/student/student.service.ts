import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User is Already exists!');
  }
  const result = await Student.create(studentData);

  // // const student= new Student(studentData);
  // // if( await student.isUserExists(studentData.id)){
  // //   throw new Error("User is Already exists!")
  // // }
  // const result= await student.save();
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getASingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getASingleStudentFromDB,
  deleteStudentFromDB,
};

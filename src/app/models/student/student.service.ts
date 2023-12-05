import { Student } from './student.model';



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
 
  getAllStudentFromDB,
  getASingleStudentFromDB,
  deleteStudentFromDB,
};

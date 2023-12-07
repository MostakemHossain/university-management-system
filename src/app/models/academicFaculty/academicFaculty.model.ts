import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);


academicFacultySchema.pre('save', async function(next){
    const  isFacultyExists=  await AcademicFaculty.findOne({name:this.name});
    if(isFacultyExists){
      throw new Error("This Faculty is Already Exists!!!");
    }
    next();
})

academicFacultySchema.pre('findOneAndUpdate',async function(next){
  const query= this.getQuery();
  const isDepartmentExists= await AcademicFaculty.findOne(query);

  if(!isDepartmentExists){
      throw new Error("This Faculty is doesn't Exists!!!");
  }
  next();

})

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
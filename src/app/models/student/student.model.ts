/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import {
  studentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TuserName,
} from './student.interface';

const userNameSchema = new Schema<TuserName>({
  firstName: {
    type: String,
    required: [true, 'First name is Required'],
    maxlength: [20, 'First name Can not be more than 20 Characters'],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is Required'],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is Required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation number is Required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is Required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is Required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation number is Required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is Required'],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is Required'],
    trim: true,
  },
  relation: {
    type: String,
    required: [true, 'Relation between LocalGuardian is Required'],
    trim: true,
  },
  occupation: { type: String, trim: true },
  contactNo: {
    type: String,
    required: [true, 'Contact Number of Local Guardian is Required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address of Local Guardian is Required'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, studentModel>(
  {
    id: { type: String, required: [true, 'ID is Required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is Required'],
      unique: true,
      ref: 'User',
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not Valid.',
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'DOB is Required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is Required'],
      unique: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact Number is Required'],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is Required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is Required'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is Required'],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian Field is Required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian Field is Required'],
    },

    profileImage: {
      type: String,
      required: [true, 'Profile Image is required'],
      trim: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtuals
studentSchema.virtual('Full Name').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom instance method
// studentSchema.methods.isUserExists= async function(id:string){
//   const existingUser= await Student.findOne({id});
//   return existingUser;
// }

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, studentModel>('Student', studentSchema);

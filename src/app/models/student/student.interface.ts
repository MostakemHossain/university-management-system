/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';

export type TuserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  relation: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TuserName;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage: string;
  isActive: 'active' | 'blocked';
  isDeleted?: boolean;
};

// for creating static

export interface studentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance
// export type studentMethods= {
//   isUserExists(id:string):Promise<TStudent | null>;
// }

// export type studentModel=Model<TStudent,Record<string, never>,studentMethods>;

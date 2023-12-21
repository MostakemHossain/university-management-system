/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?:Date,
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type TuserRole = keyof typeof USER_ROLE

export interface UserModel extends Model<TUser>{

  isUserExistsByCustomID(id:string):Promise<TUser>;
  isPasswordMatch(plainTextPassword:string,hashedPassword:string):Promise<boolean>;
}

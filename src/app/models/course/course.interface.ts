import { Types } from "mongoose";

export type TpreRequisiteCourses={
    course:Types.ObjectId,
    isDeleted:boolean,
}

export type TCourse={
    name:string,
    prefix:string,
    code:number;
    credits:number;
    preRequisiteCourses:[];
}
import { Schema, model } from "mongoose";
import { TCourse, TpreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema= new Schema<TpreRequisiteCourses>({
    course:{
        type:Schema.Types.ObjectId,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }
})

const courseSchema= new Schema<TCourse>({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    prefix:{
        type:String,
        required:true,
        trim:true,       
    },
    code:{
        type:Number,
        required:true,
    },
    credits:{
        type:Number,
        required:true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema]

})


export const Course=  model<TCourse>('Course',courseSchema);
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration= catchAsync(async (req:Request,res:Response)=>{

    const result= await semesterRegistrationService.createSemesterRegistrationIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Semester Registration is Created Successfully.',
        data:result,
    })
})
const getAllSemesterRegistration= catchAsync(async (req:Request,res:Response)=>{

    const result= await semesterRegistrationService.getAllSemesterRegistrationFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Semester Registration are Retrieved Successfully.',
        data:result,
    })
})
const getSingleSemesterRegistration= catchAsync(async (req:Request,res:Response)=>{

    const {id}= req.params;

    const result= await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Semester Registration is Retrieved Successfully.',
        data:result,
    })
})
const updateSemesterRegistration= catchAsync(async (req:Request,res:Response)=>{

    const {id}= req.params;

    const result= await semesterRegistrationService.updateSemesterRegistrationFromDB(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Semester Registration is Updated Successfully.',
        data:result,
    })
})

export const semesterRegistrationController={
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}
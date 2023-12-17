import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/couse.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB= async (payload:TOfferedCourse)=>{
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        
       
      } = payload;

       /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */

       const isSemesterRegistrationExits =
       await SemesterRegistration.findById(semesterRegistration);
   
     if (!isSemesterRegistrationExits) {
       throw new AppError(
         httpStatus.NOT_FOUND,
         'Semester registration not found !',
       );
     }
     const academicSemester= isSemesterRegistrationExits?.academicSemester;
   
    
   
     const isAcademicFacultyExits =
       await AcademicFaculty.findById(academicFaculty);
   
     if (!isAcademicFacultyExits) {
       throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found !');
     }
   
     const isAcademicDepartmentExits =
       await AcademicDepartment.findById(academicDepartment);
   
     if (!isAcademicDepartmentExits) {
       throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found !');
     }
   
     const isCourseExits = await Course.findById(course);
   
     if (!isCourseExits) {
       throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
     }
   
    //  const isFacultyExits = await faculty.findById(faculty);
   
    //  if (!isFacultyExits) {
    //    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
    //  }
    


    const result= await OfferedCourse.create({...payload,academicSemester});
    return result;
}

export const offeredCourseService= {
   createOfferedCourseIntoDB
}
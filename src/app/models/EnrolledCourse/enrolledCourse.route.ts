import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";

const router= express.Router();

router.post('/enroll-course',
    validateRequest(EnrolledCourseValidations.createEnrolledCourseValidationZodSchema)
)

export const EnrolledCourseRouters= router;
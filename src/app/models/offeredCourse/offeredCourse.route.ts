import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseController } from "./offeredCourse.controller";
import { OfferedCourseValidations } from "./offeredCourse.validation";
const router= express.Router();


router.post('/create-offered-course',
    validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
    offeredCourseController.createOfferedCourse
)

export const offeredCourseRoutes= router;
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.patch(
  '/:Id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.get('/', CourseControllers.getAllCourses);
router.get('/:Id', CourseControllers.getSingleCourses);
router.delete('/:Id', CourseControllers.deleteCourse);
export const CourseRoute = router;

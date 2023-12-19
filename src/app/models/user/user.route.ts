import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { createFacultyValidationSchema, studentValidations } from '../Faculty/faculty.validation';

import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createFacultyValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
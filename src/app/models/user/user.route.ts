import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { facultyValidations } from '../Faculty/faculty.validation';

import auth from '../../middlewares/auth';
import { StudentValidations } from '../student/student.validation';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.get(
  '/me',
  auth('admin','faculty','student'),
  UserControllers.getMe,
);

router.post('/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changedStatusValidationSchema),
  UserControllers.changeStatus
)

export const UserRoutes = router;
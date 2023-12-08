import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.validation';
const router = express.Router();

router.get(
  '/',
  validateRequest(StudentValidations.createStudentValidationSchema),
  StudentController.getAllStudents,
);
router.get('/:studentId', StudentController.getASingleStudent);
router.patch(
  '/:studentId',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;

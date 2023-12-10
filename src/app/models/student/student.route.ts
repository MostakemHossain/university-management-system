import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getASingleStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;

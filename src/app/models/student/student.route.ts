import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id',
 auth('admin','faculty','student'),
StudentController.getASingleStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;

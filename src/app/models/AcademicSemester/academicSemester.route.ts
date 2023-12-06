import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.contoller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();
router.post(
  '/create-academic-semester',

  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/',AcademicSemesterControllers.getAllAcademicSemesters);
router.get('/:semesterId',AcademicSemesterControllers.getSingleAcademicSemesters);
router.patch('/:semesterId',validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema),AcademicSemesterControllers.updateAcademicSemester);

export const AcademicSemesterRoutes = router;

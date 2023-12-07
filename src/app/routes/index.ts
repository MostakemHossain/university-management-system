import express from 'express';
import { AcademicDepartmentRoutes } from '../models/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../models/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../models/AcademicSemester/academicSemester.route';
import { StudentRoutes } from '../models/student/student.route';
import { UserRoutes } from '../models/user/user.route';

const router = express.Router();

const moduleRoute = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/students',
    router: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    router: AcademicDepartmentRoutes,
  },
 
];

moduleRoute.forEach((route) => router.use(route.path, route.router));

export default router;

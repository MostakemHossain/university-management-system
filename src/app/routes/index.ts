import express from 'express';
import { AcademicSemesterRoutes } from '../models/AcademicSemester/academicSemester.route';
import { AcademicDepartmentRoutes } from '../models/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../models/academicFaculty/academicFaculty.route';
import { CourseRoute } from '../models/course/course.route';
import { semesterRegistrationRoutes } from '../models/semesterRegistration/semesterRegistration.route';
import { StudentRoutes } from '../models/student/student.route';
import { UserRoutes } from '../models/user/user.route';
import { offeredCourseRoutes } from '../models/offeredCourse/offeredCourse.route';

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
  {
    path: '/courses',
    router: CourseRoute,
  },
  {
    path: '/semester-registrations',
    router: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    router: offeredCourseRoutes,
  },
  
];

moduleRoute.forEach((route) => router.use(route.path, route.router));

export default router;

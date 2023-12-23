import express from 'express';
import { AcademicSemesterRoutes } from '../models/AcademicSemester/academicSemester.route';
import { AdminRoutes } from '../models/Admin/admin.route';
import { AuthRoutes } from '../models/Auth/auth.router';
import { EnrolledCourseRouters } from '../models/EnrolledCourse/enrolledCourse.route';
import { FacultyRoutes } from '../models/Faculty/faculty.route';
import { AcademicDepartmentRoutes } from '../models/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../models/academicFaculty/academicFaculty.route';
import { CourseRoute } from '../models/course/course.route';
import { offeredCourseRoutes } from '../models/offeredCourse/offeredCourse.route';
import { semesterRegistrationRoutes } from '../models/semesterRegistration/semesterRegistration.route';
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
    path: '/admins',
    router: AdminRoutes,

  },
  {
    path: '/faculties',
    router: FacultyRoutes,

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
  
  {
    path: '/auth',
    router: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    router: EnrolledCourseRouters,
  },
  
];

moduleRoute.forEach((route) => router.use(route.path, route.router));

export default router;

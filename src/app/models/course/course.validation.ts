import { z } from 'zod';
const createPreRequisiteCoursesSchema = z.object({
  course: z.string(),
  isDeleted: z.string().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(createPreRequisiteCoursesSchema),
  }),
});


export const CourseValidations= {
    createCourseValidationSchema,
}
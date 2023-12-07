import { z } from 'zod';
const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department Name must be string',
      required_error: 'Academic Department Name is Required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be string',
      required_error: 'Faculty  is Required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
      name: z.string({
        invalid_type_error: 'Academic Department Name must be string',
        required_error: 'Academic Department Name is Required',
      }).optional(),
      academicFaculty: z.string({
        invalid_type_error: 'Academic Faculty must be string',
        required_error: 'Faculty  is Required',
      }).optional(),
    }),
  });

export const AcademicDepartmentValidation={
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
}
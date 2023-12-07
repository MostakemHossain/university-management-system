import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string().min(1),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  relation: z.string().min(1),
  occupation: z.string(),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other']),
      dateOfBirth: z.string(),
      email: z.string().min(1).email({ message: 'Invalid email format' }),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment:z.string(),
      profileImage: z.string().min(1),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
};

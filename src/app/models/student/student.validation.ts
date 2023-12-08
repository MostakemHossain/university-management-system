import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string().min(1),
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).optional(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherContactNo: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherContactNo: z.string().min(1).optional(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  relation: z.string().min(1),
  occupation: z.string(),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).optional(),
  relation: z.string().min(1).optional(),
  occupation: z.string().optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other']),
      dateOfBirth: z.string(),
      email: z.string().min(1).email({ message: 'Invalid email format' }),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment:z.string(),
      profileImage: z.string().min(1),
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().min(1).email({ message: 'Invalid email format' }).optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImage: z.string().min(1).optional(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};

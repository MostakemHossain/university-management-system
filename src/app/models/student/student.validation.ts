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

const localGuardianNameValidationSchema = z.object({
  name: z.string().min(1),
  relation: z.string().min(1),
  occupation: z.string(),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(['Male', 'Female', 'Other']),
  dateOfBirth: z.string().min(1),
   email: z.string().min(1).email({ message: 'Invalid email format' }),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianNameValidationSchema,
  profileImage: z.string().min(1),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export const StudentValidationSchema={
    studentValidationSchema,
}



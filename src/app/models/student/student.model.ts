import { model, Schema } from "mongoose";
import { TGuardian, TLocalGuardian, TStudent, TuserName } from "./student.interface";

const userNameSchema= new Schema<TuserName>(
    {
        firstName: {
            type: String,
            required: true,
        },
        midddleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        },
    }
);

const guardianNameSchema= new Schema<TGuardian>(
    {
        fatherName: {
            type: String,
            required: true,
        },
        fatherOccupation: {
            type: String,
        },
        fatherContactNo: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        motherOccupation: {
            type: String,
        },
        motherContactNo: {
            type: String,
            required: true,
        },
    },
)

const localGuardianNameSchema= new Schema<TLocalGuardian>(
    {
        name: {
            type: String,
            required: true,
        },
        relation: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
        },
        contactNo: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
)

const studentSchema = new Schema<TStudent>({
    id: {
        type: String,
        required: true,
    },
    name: userNameSchema,
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: guardianNameSchema,
    localGuardian: localGuardianNameSchema,
    profileImage: {
        type: String,
    },
    isActive: {
        type: String,
        enum: ["active", "blocked"],
       
    },
});

const studentModel = model<TStudent>('Student',studentSchema);

export default studentModel;



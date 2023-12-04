export type TuserName={
    
        firstName: string;
        midddleName:string;
        lastName: string;
    
};

export type TGuardian={
    fatherName:string;
    fatherOccupation:string;
    fatherContactNo:string;
    motherName:string;
    motherOccupation:string;
    motherContactNo:string;
}

export type TLocalGuardian={
    name:string;
    relation:string;
    occupation:string;
    contactNo:string;
    address:string;

}

export type TStudent={
    id:string;
    name: TuserName;
    gender:'Male'|"Female";
    dateOfBirth:string;
    email:string;
    contactNo:string;
    emergencyContactNo:string;
    bloodGroup?:"A+"|"A-"|"B+"|"B-"|"O+"|"O-"|"AB+"|"AB-";
    presentAddress:string;
    permanentAddress:string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImage?:string;
    isActive: "active"| "blocked";

}
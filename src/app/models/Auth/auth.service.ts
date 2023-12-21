import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser= async(payload:TLoginUser)=>{
    // if the user is exists
    
    const user= await User.isUserExistsByCustomID(payload?.id)
    if(!user){
         throw new AppError(httpStatus.NOT_FOUND,"This user is not Found");
    }
  
    const isUserDeleted= user?.isDeleted;
    if(isUserDeleted){
        throw new AppError(httpStatus.FORBIDDEN,"This user is deleted!");
    }
    const userStatus= user?.status;
    if(userStatus==="blocked"){
        throw new AppError(httpStatus.FORBIDDEN,"This user is blocked!");
    }
   

    // checking password
   if(!(await User.isPasswordMatch(payload?.password,user?.password))){
    throw new AppError(httpStatus.FORBIDDEN,'Incorrect Password');
   }

   // create token and send to the client
   const jwtPayload={
    userId:user.id,
    role:user.role
   }
   const assessToken= jwt.sign(jwtPayload,config.jwt_access_serect as string,{
    expiresIn:'10d',
   })

   return {
    assessToken,
    needsPasswordChange:user.needsPasswordChange
   }


}

export const AuthServices={
    loginUser,
}
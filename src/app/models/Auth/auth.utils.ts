import jwt, { JwtPayload } from "jsonwebtoken";
export const createToken= (
    jwtPayload:{userId:string,role:string},
    serect:string,
    expiresIn:string,
)=>{
   return jwt.sign(jwtPayload, serect, {
        expiresIn: expiresIn,
      })
}

export const verifyToken= (token:string,serect:string)=>{
  return jwt.verify(token,serect) as JwtPayload
}




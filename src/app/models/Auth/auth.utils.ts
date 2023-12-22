import jwt from "jsonwebtoken";
const createToken= (
    jwtPayload:{userId:string,role:string},
    serect:string,
    expiresIn:string,
)=>{
   return jwt.sign(jwtPayload, serect, {
        expiresIn: expiresIn,
      })
}

export default createToken;
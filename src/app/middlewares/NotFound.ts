import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
const notFound=(req: Request, res: Response, next: NextFunction)=>{
   
    return res.status(httpStatus.NOT_FOUND).send({
      success:false,
      message:"API not Found"
      
    })
  
  }

  export default notFound;
import nodemailer from "nodemailer";
import config from "../config";
export const sendEmail=async (to:string,html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com.",
        port: 587,
        secure: config.NODE_ENV==='production',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "mostakememon123@gmail.com",
          pass: "tqjv zvlm vuoo hywz",
        },
      });

       await transporter.sendMail({
        from: 'mostakememon123@gmail.com', // sender address
        to, // list of receivers
        subject: "reset password", // Subject line
        text: "", // plain text body
        html // html body
      });
}

// import nodemailer from "nodemailer"


// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "kshirsagarprasad025@gmail.com",
//     pass: "nklu lesd ainq ibek",
//   },
// });


// export default transporter


import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  await resend.emails.send({
    from: "Procurement Team <onboarding@resend.dev>",
    to,
    subject,
    text,
  });
};

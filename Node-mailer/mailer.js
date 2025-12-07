
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kshirsagarprasad025@gmail.com",
    pass: "nklu lesd ainq ibek",
  },
});


export default transporter
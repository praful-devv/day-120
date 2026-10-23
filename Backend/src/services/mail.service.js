import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type:"OAuth2",
    user: process.env.GOOGLE_USER,
    clientSecret: process.env.GOOGLE_CLIENT_SECRETS,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
});

transporter.verify()
.then(()=>{console.log("mail service is ready")})
.catch((err)=>{console.log("mail service not connected",err)})

export async function sendEmail({ to, subject, html, text }) {
  const mailOption = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };
  const details = await transporter.sendMail(mailOption);

  return to;
}
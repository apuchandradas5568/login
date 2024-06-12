import nodemailer from "nodemailer";

import dotenv from "dotenv";
import { HTMLTemplate } from "../utils/htmlTemplate.js";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationMail = async (email, verificationToken) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Verify Your Email Address",
    html: HTMLTemplate(
      "Verify Email",
      `
          <div class="content">
                <h2>Verify Your Email Address</h2>
                <p>Thank you for signing up! To complete your registration, please click the button below to verify your email address:</p>
                <a href="${process.env.DOMAIN}/api/v1/users/verify/${verificationToken}" class="btn text-white">Verify Email</a>
                <p>If you didn't create an account, you can safely ignore this email.</p>
              </div>
          `
    ),
  };

  // Send the email using Nodemailer

  return await transporter.sendMail(mailOptions);
};

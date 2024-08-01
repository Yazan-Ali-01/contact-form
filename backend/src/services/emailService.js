import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendUserEmail = async (toEmail, userName) => {
  try {
    const data = await ejs.renderFile(path.join(__dirname, '../templates/userEmail.ejs'), { userName });
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: toEmail,
      subject: 'Thank you for contacting us',
      html: data,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending user email:', error);
  }
};

export const sendAdminEmail = async (name, email, subject, message) => {
  try {
    const data = await ejs.renderFile(path.join(__dirname, '../templates/adminEmail.ejs'), { name, email, subject, message });
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: data,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending admin email:', error);
  }
};

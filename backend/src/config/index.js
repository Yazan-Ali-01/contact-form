
// import dotenv from 'dotenv';
// dotenv.config();

export default {
  port: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  adminEmail: process.env.ADMIN_EMAIL,
};
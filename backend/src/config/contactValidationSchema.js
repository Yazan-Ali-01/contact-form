import { checkSchema } from 'express-validator';

export const contactValidationSchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: 'Name is required',
    },
    trim: true,
  },
  email: {
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isEmail: {
      errorMessage: 'Please enter a valid email address',
    },
    normalizeEmail: true,
  },
  subject: {
    notEmpty: {
      errorMessage: 'Subject is required',
    },
    trim: true,
  },
  message: {
    notEmpty: {
      errorMessage: 'Message is required',
    },
    trim: true,
  },
});

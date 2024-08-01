import { validationResult } from 'express-validator';
import ValidationError from '../errors/ValidationError.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({ field: err.path, message: err.msg }));
    console.log(extractedErrors);
    throw new ValidationError(extractedErrors);
  }
  next();
};

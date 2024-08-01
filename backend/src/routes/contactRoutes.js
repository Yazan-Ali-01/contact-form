import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { contactValidationSchema } from '../config/contactValidationSchema.js';

const router = express.Router();

/**
 * @route POST /api/contact/submit
 * @desc Submit a new contact form
 */
router.post('/submit', contactValidationSchema, validateRequest, submitContactForm);

export default router;

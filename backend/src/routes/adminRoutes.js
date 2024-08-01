import express from 'express';
import { getAllSubmissions, getSubmissionById, exportSubmissionsToCSV } from '../controllers/adminController.js';

const router = express.Router();

/**
 * @route GET /submissions
 * @desc Get all submissions
 */
router.get('/submissions', getAllSubmissions);

/**
 * @route GET /submissions/export
 * @desc Export submissions to CSV
 */
router.get('/submissions/export', exportSubmissionsToCSV);

/**
 * @route GET /submissions/:id
 * @desc Get a specific submission by ID
 */
router.get('/submissions/:id', getSubmissionById);

export default router;

import Contact from '../models/Contact.js';
import { parse as json2csv } from 'json2csv';
import fs from 'fs';
import { sendSuccessResponse } from '../utils/responseUtils.js';
import NotFoundError from '../errors/NotFoundError.js';

/**
 * Get all submissions
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getAllSubmissions = async (req, res) => {
  const submissions = await Contact.find({});
  sendSuccessResponse(res, submissions, 'Submissions retrieved successfully');
};

/**
 * Get a specific submission by ID
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getSubmissionById = async (req, res) => {
  const { id } = req.params;
  const submission = await Contact.findById(id);
  if (!submission) {
    throw new NotFoundError('Submission not found');
  }
  sendSuccessResponse(res, submission, 'Submission retrieved successfully');
};

/**
 * Export submissions to CSV
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const exportSubmissionsToCSV = async (req, res) => {
  const submissions = await Contact.find({});
  const fields = ['name', 'email', 'subject', 'message']; // Adjust fields if necessary
  const csv = json2csv(submissions, { fields });
  const filePath = 'submissions.csv';
  fs.writeFileSync(filePath, csv);
  res.download(filePath);
};

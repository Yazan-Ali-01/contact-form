import Contact from '../models/Contact.js';
import { getIo } from '../socket.js';
import { connectRabbitMQ, sendMessage } from '../utils/messageQueue.js';
import { sendSuccessResponse } from '../utils/responseUtils.js';

/**
 * Handle contact form submission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    const channel = await connectRabbitMQ();
    await sendMessage(channel, { type: 'user', email, name });
    await sendMessage(channel, { type: 'admin', name, email, subject, message });

    const io = getIo();
    io.emit('new-submission', newContact);

    sendSuccessResponse(res, null, 'Form submitted successfully');
  } catch (error) {
    throw error
  }
};

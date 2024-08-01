import amqp from 'amqplib';
import { sendUserEmail, sendAdminEmail } from '../services/emailService.js';

const rabbitMQURL = process.env.RABBITMQ_URL;
let retryCount = 0;
const maxRetries = 6;

// Utility function to delay retries
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const connectRabbitMQ = async () => {
  while (retryCount < maxRetries) {
    try {
      const connection = await amqp.connect(rabbitMQURL);
      const channel = await connection.createConfirmChannel();
      await channel.assertQueue('emailQueue', { durable: true });
      channel.prefetch(1);

      connection.on('error', (err) => console.error('RabbitMQ connection error:', err));
      connection.on('close', () => console.log('RabbitMQ connection closed'));

      console.log('Connected to RabbitMQ successfully!');
      return channel;
    } catch (error) {
      console.error(`Failed to connect to RabbitMQ (Attempt ${retryCount + 1} of ${maxRetries}):`, error);
      retryCount++;
      await delay(5000); // Wait for 5 seconds before retrying
    }
  }
  console.error('Max connection retries reached');
  return null;
};

export const sendMessage = async (channel, message) => {
  if (!channel) {
    console.error('Cannot send message: Channel is not established');
    return;
  }

  try {
    await channel.sendToQueue('emailQueue', Buffer.from(JSON.stringify(message)), {
      persistent: true
    });
    console.log('Message sent successfully to the queue');
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

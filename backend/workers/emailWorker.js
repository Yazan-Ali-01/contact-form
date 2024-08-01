import { connectRabbitMQ } from '../src/utils/messageQueue.js';
import { sendUserEmail, sendAdminEmail } from '../src/services/emailService.js';

const processEmail = async () => {
  const channel = await connectRabbitMQ();
  if (!channel) {
    console.error('Unable to start the email processor due to failed RabbitMQ connection');
    return;
  }

  channel.consume('emailQueue', async (msg) => {
    const { type, email, name, subject, message } = JSON.parse(msg.content.toString());

    try {
      if (type === 'user') {
        await sendUserEmail(email, name);
      } else if (type === 'admin') {
        await sendAdminEmail(name, email, subject, message);
      }
      channel.ack(msg);
    } catch (error) {
      console.log('im here 6');
      console.error('Error processing email:', error);
      channel.nack(msg);
    }
  }, { noAck: false });
};

processEmail();

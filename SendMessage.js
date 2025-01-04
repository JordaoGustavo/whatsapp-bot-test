import axios from 'axios';
import { EVOLUTION_API_URL, INSTANCE_ID, AUTHENTICATION_API_KEY } from './config.js';

const sendMessage = async (to, message) => {
  try {
    const response = await axios.post(
      `${EVOLUTION_API_URL}/message/sendText/${INSTANCE_ID}`,
      {
        number: to,
        text: message,
        delay: 123,
        linkPreview: true,
        mentionsEveryOne: true,
        mentioned: [to.replace(/\D/g, '')]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'apikey': AUTHENTICATION_API_KEY
        }
      }
    );
    // console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Failed to send message:', error.message);
  }
};

export default sendMessage;
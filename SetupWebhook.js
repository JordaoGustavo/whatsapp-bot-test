import axios from 'axios';
import {AUTHENTICATION_API_KEY, EVOLUTION_API_URL, WEBHOOK_URL, INSTANCE_ID} from './config.js';
 
const setupWebhook = async () => {
  try {
    console.log('Setting up webhook...', WEBHOOK_URL);
    const response = await axios.post(
      `${EVOLUTION_API_URL}/webhook/set/${INSTANCE_ID}`,
      {
        webhook: {
          enabled: true,
          url: WEBHOOK_URL,
          events: [
            "MESSAGES_UPSERT",
            "CHATS_SET"
          ],
          base64: false,
          byEvents: false
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'apikey': AUTHENTICATION_API_KEY
        }
      }
    );
    console.log('Webhook setup successful:', response.data);
  } catch (error) {
    console.error('Failed to set up webhook:', error.message);
  }
};

export default setupWebhook;
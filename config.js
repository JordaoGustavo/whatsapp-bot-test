import dotenv from 'dotenv';

dotenv.config();

const {
  EVOLUTION_API_URL,
  AUTHENTICATION_API_KEY,
  WEBHOOK_URL,
  PORT = 3001,
  INSTANCE_ID,
  REDIS_URI,
  OPENAI_API_KEY,
} = process.env;

export {
  EVOLUTION_API_URL,
  AUTHENTICATION_API_KEY,
  WEBHOOK_URL,
  PORT,
  INSTANCE_ID,
  REDIS_URI,
  OPENAI_API_KEY
};
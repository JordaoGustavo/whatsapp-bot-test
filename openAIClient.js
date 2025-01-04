import OpenAI from 'openai';
import { OPENAI_API_KEY } from './config.js';

const openAIClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export default openAIClient;
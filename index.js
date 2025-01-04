import express from 'express';
import bodyParser from 'body-parser';
import sendMessage from './SendMessage.js';
import setupWebhook from './SetupWebhook.js';
import CommandFactory from './Commands/CommandFactory.js';
import { PORT, REDIS_URI } from './config.js';
import { createClient } from 'redis';

console.log('CACHE_REDIS_URI', REDIS_URI);
const app = express();
app.use(bodyParser.json());

const redisClient = createClient({
  url: REDIS_URI,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Function to handle incoming messages
app.post('/webhook', async (req, res) => {
  const message = req.body;

  if (!message || !message.data) {
    console.warn('Invalid message structure:', message);
    return res.status(400).send('Invalid message structure');
  }

  const { data } = message;
  const { key, message: msg } = data;
  const from = key.remoteJid;
  const body = msg.conversation;

  console.log('Incoming message:', body.toLowerCase());

  // Get user state from Redis
  let userState = await redisClient.get(from, );
  if (!userState) {
    userState = { lastMessage: null };
  } else {
    userState = JSON.parse(userState);
  }

  const command = CommandFactory.createCommand(from, body, userState);
  if (command) {
    await command.execute();
    userState.lastMessage = command.constructor.name;
  } else {
    await sendMessage(from, 'Desculpe, não entendi sua solicitação. Por favor, tente novamente.');
    userState.lastMessage = 'fallback';
  }

  // Save user state to Redis with a TTL of one day (86400 seconds)
  await redisClient.set(from, JSON.stringify(userState), 'EX', 86400);

  res.sendStatus(200);
});


// Start the server
app.listen(PORT, async () => {
  await setupWebhook();
  await redisClient.connect();
  console.log(`Bot server is running on port ${PORT}`);
});
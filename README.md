# WhatsApp Bot

This project is a WhatsApp bot that uses OpenAI's GPT-3.5-turbo model to answer user questions based on predefined top questions and answers.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (optional, for running Redis and PostgreSQL)

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/JordaoGustavo/whatsapp-bot-test.git
   cd whatsapp-bot-test
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file based on the `.env-example.txt` file and fill in the required values:

   ```sh
   cp .env-example.txt .env
   ```

4. Ensure you have the necessary environment variables set in your `.env` file:

   ```plaintext
   AUTHENTICATION_API_KEY=your_authentication_api_key
   OPENAI_API_KEY=your_openai_api_key
   DATABASE_CONNECTION_URI=your_database_connection_uri
   REDIS_URI=your_redis_uri
   ```

## Running the Project

1. Start the Redis and PostgreSQL services (if using Docker):

   ```sh
   docker-compose up -d
   ```

2. Run the bot:

   ```sh
   npm start
   ```

## Usage
First, open your Evolution API, configure your WhatsApp user to it, set your integration name to `INSTANCE_ID` in the `.env` file, and ensure you have the correct `EVOLUTION_API_URL`.

The bot will start and listen for incoming messages. When a user sends a question, the bot will respond based on the predefined top questions and answers or use OpenAI's GPT-3.5-turbo model to generate a response.

## Project Structure

- `Commands/AIAnswerCommand.js`: The command that handles answering user questions.
- `SendMessage.js`: Utility for sending messages.
- `openAIClient.js`: Configuration for the OpenAI client.
- `.env-example.txt`: Example environment variables file.

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.

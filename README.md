# AI Chatbot Backend

A Discord bot and Express API backend powered by OpenAI's GPT-4o-mini model with integrated chat, commands, and moderation features.

## Features

- **AI-Powered Chat**: Conversational AI responses using OpenAI's GPT-4o-mini
- **Discord Integration**: Full Discord.js bot with slash commands and event handlers
- **REST API**: Express server with chat endpoints
- **Interactive Commands**:
  - `/meme` - Fetch and share random memes
  - `/poll` - Create and manage polls
  - `/stats` - View server statistics
- **Auto-Moderation**: Automatic content moderation with banned word filtering
- **DM Confessions**: Private confession system via direct messages
- **Event Handling**: Server member tracking, message processing, and bot status management

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Discord**: discord.js v14
- **API Framework**: Express.js
- **AI**: OpenAI API
- **Utilities**: node-cron for scheduled tasks

## Prerequisites

- Node.js 18+
- npm or yarn
- Discord Bot Token
- OpenAI API Key

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-chatbot-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DISCORD_TOKEN=your_discord_bot_token
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

## Usage

### Development
Start the development server with hot-reload:
```bash
npm run dev
```

### Build
Compile TypeScript to JavaScript:
```bash
npm run build
```

### Production
Run the built application:
```bash
npm start
```

### Type Checking
Verify TypeScript types without emitting:
```bash
npm run type-check
```

## API Endpoints

### Chat
- **POST** `/api/chat` - Send a message and receive an AI-generated response

### Health Check
- **GET** `/health` - Check server status

## Project Structure

```
src/
├── commands/          # Discord slash commands (meme, poll, stats)
├── controllers/       # Request handlers (chat, meme generation)
├── discord/           # Discord-specific setup (command registration)
├── DM/                # Direct message features (confessions)
├── events/            # Discord event listeners (ready, member join, messages)
├── middleware/        # Express middleware (error handling)
├── routes/            # API routes (chat endpoints)
├── services/          # Business logic
│   ├── aiService.ts           # OpenAI integration
│   ├── autoModService.ts      # Content moderation
│   ├── commandHandler.ts      # Command execution
│   ├── discordService.ts      # Bot initialization
│   └── eventHandler.ts        # Event registration
├── types/             # TypeScript type definitions
├── utils/             # Utility functions (embed helpers)
├── consts.ts          # Constants (banned words, etc)
└── index.ts           # Application entry point
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your Discord bot token | Yes |
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `PORT` | Express server port (default: 5000) | No |

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure TypeScript compilation succeeds
4. Submit a pull request

## License

MIT

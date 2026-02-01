import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: Message[];
}

export interface ChatResponse {
  success: boolean;
  response: string;
  timestamp: string;
}

export interface DiscordStatus {
  connected: boolean;
  status: string;
  username?: string;
}

export interface ServerStatus {
  api: string;
  discord: DiscordStatus;
  timestamp: string;
}
export interface RedditPostData {
  title: string;
  url: string;
  permalink: string;
  author: string;
  subreddit: string;
  score: number;
  num_comments: number;
  [key: string]: any; 
}

interface RedditPost {
  kind: string;
  data: RedditPostData;
}

export interface RedditAPIResponse {
  kind: string;
  data: {
    modhash: string;
    dist: number;
    children: RedditPost[];
    after: string | null;
    before: string | null;
  };
}

export interface TypedRequest<T> extends Request {
  body: T;
}

interface Config {
  openaiApiKey: string;
  discordBotToken?: string;
  discordClientId?: string;
  port: number;
  nodeEnv: string;
}

export const config: Config = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  discordBotToken: process.env.DISCORD_BOT_TOKEN,
  discordClientId: process.env.DISCORD_CLIENT_ID,
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development'
};
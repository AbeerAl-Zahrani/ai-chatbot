import { Response, NextFunction } from 'express';
import { generateAIResponse } from '../services/aiService.js';
import { getDiscordStatus } from '../services/discordService.js';
import { TypedRequest, ChatRequest, ChatResponse, ServerStatus, RedditPostData, RedditAPIResponse } from '../types/index.js';

export const sendMessage = async (
  req: TypedRequest<ChatRequest>,
  res: Response<ChatResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({
        success: false,
        response: 'Messages array is required',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const response = await generateAIResponse(messages);

    res.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const getStatus = async (
  req: TypedRequest<unknown>,
  res: Response<ServerStatus>
): Promise<void> => {
  const discordStatus = getDiscordStatus();
  
  res.json({
    api: 'operational',
    discord: discordStatus,
    timestamp: new Date().toISOString()
  });
};
export const getRandomMeme = async (): Promise<RedditPostData> => {
  try{
const res = await fetch('https://www.reddit.com/r/memes/random/.json', {
    headers: {
'User-Agent': 'DiscordBot (by /u/coolgamer123)'
    },
  });

  if (!res.ok) {
    throw new Error(`Reddit API returned status ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as RedditAPIResponse[];

  if (!Array.isArray(data) || !data[0]?.data?.children?.length) {
    throw new Error('No posts found in Reddit response');
  }

  return data[0].data.children[0].data;

  }catch (error){
     console.error(error)
    throw new Error('Failed to fetch server memes');
  }
}
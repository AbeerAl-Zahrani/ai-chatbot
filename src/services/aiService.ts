import OpenAI from 'openai';
import { config, Message } from '../types';

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

export const generateAIResponse = async (messages: Message[]): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
      max_tokens: 1024,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to generate AI response');
  }
};

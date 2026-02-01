import { DMChannel, Message as DiscordMessage, TextChannel } from "discord.js";
import { handleAutoMod } from "../services/autoModService";
import { handleCommand } from "../services/commandHandler";
import { generateAIResponse } from "../services/aiService";
import { Message } from "../types";
import { confessionsDm } from "../DM/confessions";


export const name = 'messageCreate';
export const once = false; 
const conversationHistory = new Map<string, Message[]>();
export const execute = async (message: DiscordMessage) => {
  if (message.author.bot) return;

   await handleCommand(message);
await handleAutoMod(message);
await confessionsDm(message)
     const botUser = message.client.user;

    const isMentioned = botUser && message.mentions.has(botUser);
    const isDM = message.channel.isDMBased();

    if (!isMentioned && !isDM) return;

    try {
if (message.channel instanceof TextChannel || message.channel instanceof DMChannel) {
  await message.channel.sendTyping();
}
      const userId = message.author.id;
      if (!conversationHistory.has(userId)) {
        conversationHistory.set(userId, []);
      }

      const history = conversationHistory.get(userId)!;
      
      let cleanContent = message.content
        .replace(new RegExp(`<@!?${botUser?.id}>`, 'g'), '')
        .trim();
      
      history.push({
        role: 'user',
        content: cleanContent
      });

      if (history.length > 10) {
        history.shift();
        history.shift();
      }

      const aiResponse = await generateAIResponse(history);

      history.push({
        role: 'assistant',
        content: aiResponse
      });

      if (aiResponse.length > 2000) {
        const chunks = aiResponse.match(/[\s\S]{1,2000}/g) || [];
        for (const chunk of chunks) {
          await message.reply(chunk);
        }
      } else {
        await message.reply(aiResponse);
      }

    } catch (error) {
      console.error('Discord message error:', error);
      await message.reply('Sorry, I encountered an error processing your message.');
    }
 
  }
  


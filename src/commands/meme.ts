import { getRandomMeme } from "../controllers/chatController";
import { Message} from "discord.js"
export const name = 'meme';
export const description = 'Get a random meme';
export const execute = async (message: Message) => {
     try {
        const post = await getRandomMeme();
          if (message.channel.isTextBased()) {
    
      const textChannel = message.channel as any; 
      await textChannel.send(`${post.title}\n${post.url}`);
    }
        } catch (err) {
          console.error(err);
          await message.reply('Could not fetch a meme right now 😅');
        }
}
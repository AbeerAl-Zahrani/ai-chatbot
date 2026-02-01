import { Message } from "discord.js";
import { bannedWords } from "../consts";

const warnings = new Map<string, number>();

export const handleAutoMod = async (message:Message) => {

     const content = message.content.toLowerCase();

  const foundWord = bannedWords.find(word => content.includes(word));

  if (foundWord) {
    const count = warnings.get(message.author.id) || 0;
    warnings.set(message.author.id, count + 1);

    try {
      await message.reply(
        `⚠️ ${message.author}, يرجى تجنب الكلمات غير اللائقة: "${foundWord}". هذا تحذير ودي! (${count + 1}/3)`
      );
    } catch (err) {
      console.error('Could not send warning to user:', err);
    }

    const modChannelId = process.env.MOD_LOG_CHANNEL_ID;
    if (modChannelId) {
      const modChannel = message?.guild?.channels.cache.get(modChannelId);
      if (modChannel?.isTextBased()) {
        await modChannel.send(
          `🚨 **AutoMod Warning**\nUser: ${message.author.tag}\nWord: "${foundWord}"\nMessage: ${message.content}\nWarnings: ${count + 1}/3`
        );
      }
    }

    await message.delete().catch(() => {});

    if (count + 1 >= 3) {
      const muteRole = message?.guild?.roles.cache.find(r => r.name === 'Muted');
      if (muteRole && message.member) {
        await message.member.roles.add(muteRole);
         if (message.channel && 'send' in message.channel) 
        await message.channel.send(
          `${message.author} تم تقييدك مؤقتًا لمدة 10 دقائق بسبب عدة تحذيرات ⚠️`
        );

        setTimeout(async () => {
          await message.member?.roles.remove(muteRole);

      if (message.channel && 'send' in message.channel) 
          await message.channel.send(`${message.author} تم رفع التقييد عنك 💖`);
        }, 10 * 60 * 1000);
      }
    }

    return; 
  }
}
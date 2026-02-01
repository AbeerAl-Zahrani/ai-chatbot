import { Message } from "discord.js";

export const name = 'stats';
export const description = 'stats';
export const execute = async (message:Message) => {
      const guild = message.guild;
    if (!guild) return;
    const total = guild.memberCount;
    const online = guild.members.cache.filter(m => m.presence?.status === 'online').size;
    if(message.channel && "send" in message.channel)
    await message.channel.send(`📊 Server Stats:\nTotal Members: ${total}\nOnline Members: ${online}`);
}
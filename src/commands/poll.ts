import { Message } from "discord.js";

export const name = 'poll';
export const description = 'Question';
export const execute = async (message:Message) => {


     const question = message.content.slice(6).trim();
    if (!question) return message.reply('📝 الرجاء إدخال سؤال للاستفتاء.');
  if(message.channel && "send" in message.channel){
      const pollMsg = await  message.channel.send(`📊 **استفتاء:** ${question}`);
    await pollMsg.react('✅');
    await pollMsg.react('❌');
}
return null
}
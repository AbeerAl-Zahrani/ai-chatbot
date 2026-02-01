import {  Message } from "discord.js";


export const confessionsDm = async (message:Message) => {

    if (message.channel.isDMBased()) {
        const confession = message.content.trim();
        if (confession.length < 5) {
          await message.reply('اكتبي رسالة أطول قليلًا 🌸');
          return;
        }
    
        if (confession.includes('@everyone') || confession.includes('@here')) {
          await message.reply('المنشن الجماعي غير مسموح 💗');
          return;
        }
    
        try {
          const channel = await message.channel.client.channels?.fetch(process.env.CONFESSIONS_CHANNEL_ID!);
    
          if (channel?.isTextBased() && 'send' in channel) {
            await channel.send({
              embeds: [
                {
                  title: '🌷 اعتراف مجهول',
                  description: confession,
                  color: 0xFFB6C1,
                  footer: { text: 'تم الإرسال بشكل مجهول 💕' },
                  timestamp: new Date().toISOString(),
                },
              ],
            });
    
            await message.reply('تم إرسال اعترافك بنجاح 💌');
          }
        } catch (err) {
          console.error(err);
          await message.reply('حدث خطأ، حاولي مرة أخرى لاحقًا 😞');
        }
    
        return;
      }
} 
import { GuildMember } from "discord.js";
export const name = 'guildMemberAdd';
export const once = false; 
export const execute = async (member:GuildMember) => {
      try {
    await member.send(`مرحبًا بك في الخادم، ${member.user.username}! 🎉 استمتع بوقتك وتفقّد القوانين!`);
    const welcomeChannel = member.guild.channels.cache.get(process.env.YOUR_WELCOME_CHANNEL_ID!)
    if (welcomeChannel?.isTextBased()) {
      welcomeChannel.send(`الجميع رحبوا بـ ${member}! 🎈
`);
    }
  } catch (err) {
    console.error(err);
  }
}
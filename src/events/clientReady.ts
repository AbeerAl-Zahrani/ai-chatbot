import { Client } from "discord.js";
import { rulesEmbed } from "../utils/emdedHepler";

export const name = 'clientReady';
export const once = true; 
export const execute = async (discordClient:Client | null) => {
  if(discordClient){
    setBotStatus(discordClient)
  }
      const channel = await discordClient?.channels.fetch(process.env.RULES_CHANNEL_ID!);

   if (!channel?.isTextBased() || !('send' in channel)) return;

  try {
    const message = await channel.messages.fetch(process.env.RULES_MESSAGE_ID!);
    await message.edit({ embeds: [rulesEmbed] });
    console.log('Rules message updated');
  } catch {
    const msg = await channel.send({ embeds: [rulesEmbed] });
    console.log('Rules message created:', msg.id);
    
  }
}

const setBotStatus = (client: Client) => {
  if (!client.user) return;
  client.user.setPresence({
    activities: [{ name: '🌸 Chat & Fun 🎀', type: 0 }],
  });
};
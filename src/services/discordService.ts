import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { config, DiscordStatus } from '../types';
import cron from 'node-cron';
import { loadCommands } from './commandHandler';
import { loadEvents } from './eventHandler';
let discordClient: Client | null = null;


 console.log('Discord token loaded:', config);
export const initDiscordBot = async () => {
  console.log('Discord token loaded:', config.discordBotToken);

  if (!config.discordBotToken) {
    console.log('Discord bot token not provided. Skipping Discord initialization.');
    return;
  }

  discordClient = new Client({
   intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [
    Partials.Channel, 
  ],
});
await loadCommands();
  await loadEvents(discordClient); 

   cron.schedule('0 12 * * *', async () => { 
  try {
    const channel = await discordClient?.channels.fetch('CHANNEL_ID');
    const res = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
    const data = await res.json();
if (channel?.isTextBased() && 'send' in channel) {
  await channel.send(`🃏 Joke of the day: ${(data as any).joke}`);
}
 } catch (err) {
    console.error(err);
  }
});
  discordClient.login(config.discordBotToken);
};

export const getDiscordStatus = (): DiscordStatus => {
  if (!discordClient) {
    return { connected: false, status: 'Not initialized' };
  }
  return {
    connected: discordClient.isReady(),
    status: discordClient.isReady() ? 'Connected' : 'Disconnected',
    username: discordClient.user?.tag || undefined
  };
};
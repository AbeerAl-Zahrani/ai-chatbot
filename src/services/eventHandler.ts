import fs from 'fs';
import path from 'path';
import { Client } from 'discord.js';

interface BotEvent {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;
}

export const loadEvents = async (client: Client) => {
  const eventsPath = new URL( '../events',import.meta.url).pathname;
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
console.log("eventFiles",eventFiles)
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    console.log(filePath)
    const event: BotEvent = (await import(filePath)) as BotEvent;
    console.log(event)

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    console.log(`Loaded event: ${event.name}`);
  }
};

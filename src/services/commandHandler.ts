import fs from 'fs';
import path from 'path';
import { Collection, Message } from 'discord.js';

interface BotCommand {
  name: string;
  description: string;
  execute: (message: Message) => Promise<void>;
}

export const commands = new Collection<string, BotCommand>();

export const loadCommands = async () => {
  const commandsPath = new URL('../commands',import.meta.url).pathname;
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.ts') || f.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandModule = await import(filePath);
    if (commandModule.name && commandModule.execute) {
      commands.set(commandModule.name, commandModule as BotCommand);
      console.log(`Loaded command: ${commandModule.name}`);
    }
  }
};

export const handleCommand = async (message: Message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  if (!commandName) return;

  const command = commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message);
  } catch (err) {
    console.error(`Error executing command ${commandName}:`, err);
    await message.reply('Oops! Something went wrong executing that command.');
  }
};

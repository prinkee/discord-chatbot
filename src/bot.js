const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs = require("fs");
const path = require("path");
const config = require("../config.json");

// Create client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages],
  partials: [Partials.Channel]
});

// Load event files
const eventsPath = path.join(__dirname, 'events');
const eventDirectories = ['client'];

eventDirectories.forEach((dir) => {
  const dirPath = path.join(eventsPath, dir);
  const eventFiles = fs.readdirSync(dirPath).filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(dirPath, file);
    const event = require(filePath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
});

// Initialize client commands
client.commands = new Collection();

// Load command files
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// login to discord
client.login(config.discord.token);
module.exports = client;

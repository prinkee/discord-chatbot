const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const config = require('../config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.discord.token);

(async () => {
	try {
		// Deploy commands
		console.log(`Started refreshing ${commands.length} global application (/) commands.`);
		const globalData = await rest.put(
			Routes.applicationCommands(config.discord.client_id),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${globalData.length} global application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
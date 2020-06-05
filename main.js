const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./info.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//read all commands modules
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));
for (file of commandFiles) {
	const comand = require(`./commands/${file}`);

	client.commands.set(comand.name, comand);
}

client.on('ready', () => {
	console.log('Ready');
});

client.on('message', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = await message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args, client);
	} catch (error) {
		console.log(error);
		message.reply('Произошла ошибка. Скорее всего, ты сделал что-то не то.');
	}
});
client.login(token);

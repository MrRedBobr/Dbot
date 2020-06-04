const Discord = require('discord.js');
const client = new Discord.Client();
const info = require('./info.json');

client.on('ready', () => {
	console.log('Ready');
});

client.on('message', (msg) => {
	if (msg.content == 'ping') msg.reply('pong');
});
client.login(info.token);

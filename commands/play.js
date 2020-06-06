const fs = require('fs');
const musicList = fs
	.readdirSync('./music/')
	.filter((file) => file.endsWith('.mp3'));

const musicPlay = (connection, client, list) => {
	const broadcast = client.voice.createBroadcast();
	broadcast.play(`./music/${list.shift()}`);
	connection.play(broadcast);
	broadcast.dispatcher.on('finish', () => {
		musicPlay(connection, client, list);
	});
};

module.exports = {
	name: 'play',
	description: 'Connect voice chat.',
	guildOnly: true,
	execute: (message, args, client) => {
		connection = message.guild.voice.connection;
		musicPlay(connection, client, musicList.slice());
	},
};

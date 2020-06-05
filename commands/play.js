const fs = require('fs');
const musicList = fs
	.readdirSync('./music/')
	.filter((file) => file.endsWith('.mp3'));

const musicPlay = (connection, client) => {
	const broadcast = client.voice.createBroadcast();
	broadcast.play(`./music/${musicList.shift()}`);
	connection.play(broadcast);
	broadcast.dispatcher.on('finish', () => {
		musicPlay(connection, client);
	});
};

module.exports = {
	name: 'play',
	description: 'Connect voice chat.',
	guildOnly: true,
	execute: (message, args, client) => {
		for (const connection of client.voice.connections.values()) {
			musicPlay(connection, client);
		}
	},
};

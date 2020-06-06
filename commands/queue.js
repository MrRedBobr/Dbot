const ytdl = require('ytdl-core');
const serversQueue = [];

const playQueue = (connection, client, list) => {
	const broadcast = client.voice.createBroadcast();
	broadcast.play(ytdl(list.queue[0], { filter: 'audioonly' }));
	connection.play(broadcast);
	broadcast.dispatcher.on('finish', () => {
		list.queue.shift();
		if (!list.queue) {
			broadcast.end();
		} else playQueue(connection, client, list);
	});
};

module.exports = {
	name: 'queue',
	description: 'YouTube queue.',
	guildOnly: true,
	execute: (message, args, client) => {
		let fromChannelMessage = message.channel.id;
		let index = serversQueue.findIndex((arg) => arg.id == fromChannelMessage);
		if (index != -1) {
			serversQueue[index].queue.push(args[0]);

			if (serversQueue[index].queue.length == 1) {
				playQueue(message.guild.voice.connection, client, serversQueue[index]);
			}
		} else {
			let newServer = { id: fromChannelMessage, queue: [args[0]] };
			serversQueue.push(newServer);
			playQueue(message.guild.voice.connection, client, newServer);
		}
	},
};

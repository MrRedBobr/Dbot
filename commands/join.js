module.exports = {
	name: 'join',
	description: 'Connect voice chat.',
	guildOnly: true,
	execute: (message, args, client) => {
		message.member.voice.channel.join();
	},
};

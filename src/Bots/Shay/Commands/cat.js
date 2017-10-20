const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { get } = require(`snekfetch`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownTime: 3,
			name: basename(__filename, `.js`),
			description: `Random cat picture`,
			usage: `Cat`,
			aliases: []
		});
	}

	run(client, message) {
		get(`http://random.cat/meow`).then(data => {
			const embed = new MessageEmbed()
				.setImage(data.body.file);
			client.send(message, { embed });
		});
	}
}

module.exports = Command;
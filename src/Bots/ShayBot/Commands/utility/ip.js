const Commands = require(`../../../../__Global/Structures/Commands`);
const { get } = require(`snekfetch`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			description: `Gives the server's ip address`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		if (process.env.LOCAL_TESTING) return false;

		get(`https://api.ipify.org/`).then(data => {
			client.send(message, data.text, { code: `` });
		});
		return true;
	}
}

module.exports = Command;

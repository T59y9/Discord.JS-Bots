const Commands = require(`../../../../__Global/Structures/Commands`);
const { Client } = require(`discord.js`);
const { basename } = require(`path`);

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
			name: basename(__filename, `.js`),
			group: basename(__dirname, `.js`),
			description: `Tests tokens`,
			usage: `[Token]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (!client.whitelist.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message);

		args.forEach(arg => {
			this.testToken(arg, message.author.username).then(data => {
				client.send(message, `
					Successfully logged in as ${data.USERNAME}\n
					You have just saved \`${data.GUILDS.size}\` guilds:\n
					\`\`\`\n${data.GUILDS.map(guild => guild.name).join(`\n`)}\n\`\`\`
				`);
			}).catch(error => {
				client.send(message, error, { code: `` });
			});
		});
		return true;
	}

	testToken(botToken, user) {
		return new Promise((resolve, reject) => {
			const bot = new Client();

			bot.on(`ready`, () => {
				bot.guilds.forEach(guild => {
					guild.owner.user.send(`
						I am leaving \`${guild.name}\`\n
						My token has been leaked, Please don't re-invite me until it has been resolved.\n
						You can thank \`${user}\` for protecting your server. <3
					`).catch(() => null);
					guild.leave().catch(() => null);
				});
				resolve({ USERNAME: bot.user.username, GUILDS: bot.guilds });
			});

			bot.login(botToken).catch(error => reject(error));
		});
	}
}

module.exports = Command;

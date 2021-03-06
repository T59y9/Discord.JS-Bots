const Events = require(`../Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, guild) {
		if (process.env.LOCAL) return false;

		client.updateActivity();

		client.guilds.get(client.servers.MAIN).channels.find(`name`, `guild-log`).send(new MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setColor(0x00FF00)
			.setFooter(`Joined`)
			.setTimestamp()
		);
		return true;
	}
}

module.exports = Event;

const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "queueEnd",
	execute(queue) {
		queue.metadata.channel.send({
			embeds: [
				new MessageEmbed()

					.setDescription("<a:musicop:946630122881028208> | The queue has ended, leaving the channel now.")
					.setColor(`YELLOW`),
			],
		});
	},
};

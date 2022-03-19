const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: "messageCreate",

	async execute(message) {
		if (
			message.content == `<@${message.client.user.id}>` ||
			(message.content == `<@!${message.client.user.id}>` &&
				!message.author.bot &&
				!message.author.system)
		) {
			const m = new MessageEmbed()
				.setColor("#0099ff")
				.setDescription(
					`Hello, I am ${message.client.user.username} and i am a small music bot!\n I'm entirely slash commands based , try doing \`\`\`/help\`\`\``
				);

if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
                return message.reply({
                    content: `<:worng:946623680291696660> I am missing the Permission to \`USE_EXTERNAL_EMOJIS\``
                })
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
                return message.reply({
                    content: `<:worng:946623680291696660> I am missing the Permission to \`EMBED_LINKS\``
                })
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setTitle(`<:worng:946623680291696660> I am missing the Permission to \`ADD_REACTIONS\``)
                    ]
                }) 

      
			return message.reply({ embeds: [m] });
		}
	},
};

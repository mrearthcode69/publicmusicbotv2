const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions , Discord , MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("uptime")
		.setDescription("bot online time"),
		
	execute: async (interaction) => {
		const db = interaction.client.db;
		const guild = interaction.guildId;
    const client = interaction.client;

		const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60
        const embed = new MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setColor("RED")
            .addField("<a:Online:952497675872403506> UPTIME", ` ${days}days ${hours}hrs ${minutes}min ${seconds}sec`, true)
            .setTimestamp(Date())
        interaction.editReply({ embeds: [embed] })
    }
}

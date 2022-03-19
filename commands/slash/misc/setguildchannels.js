const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("commands_channel")
		.setDescription(
			"Set the commands channel , after this my commands can only be executed in the channel you set"
		)
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("The channel you want to set as main commands channel")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const db = interaction.client.db;
		const channel = interaction.options.getChannel("channel");
		const guild = interaction.guildId;

		if (
			!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
		) {
			return interaction.editReply({
				content: `<:worng:946623680291696660> | Manage Channels Permission is required to perform that action!`,
				ephemeral: true,
			});
		}
		const x = await db.set(`${guild}_cmd_channel`, channel.id);

		return interaction.editReply(
			x
				? `<:yes_tick:946460789957607425>  | Successfully set <#${channel.id}> as your guild's command channel`
				: `<:worng:946623680291696660> | Failed to do that`
		);
	},
};

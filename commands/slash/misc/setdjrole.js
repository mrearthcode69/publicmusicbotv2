const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("dj_role")
		.setDescription("Set the dj role for your server")
		.addRoleOption((option) =>
			option
				.setName("role")
				.setDescription("The role you want to set as the dj role")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const db = interaction.client.db;
		const role = interaction.options.getRole("role");
		const guild = interaction.guildId;

		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
			return interaction.editReply({
				content: `<:worng:946623680291696660> | Manage Roles Permission is required to perform that action!`,
				ephemeral: true,
			});
		}
		const x = await db.set(`${guild}_dj_role`, role.id);

		return interaction.editReply(
			x
				? `<:yes_tick:946460789957607425>  | Successfully set ${role.name} as your guild's dj role`
				: `<:worng:946623680291696660> | Failed to do that`
		);
	},
};

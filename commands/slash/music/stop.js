const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stop your music and destroy your queue"),

	async execute(interaction) {
		const player = interaction.client.player;
		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `<:worng:946623680291696660>|  You need to be in a voice channel to do that!`,
				ephemeral: true,
			});

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.editReply({
				content: `<:worng:946623680291696660> | You need to be in the same voice channel as me to do that`,
				ephemeral: true,
			});
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return interaction.editReply({
				content: "<:worng:946623680291696660> | No music is being played!",
			});
		const db = interaction.client.db;
		const guild = interaction.guildId;
		const roll = db.get(`${guild}_dj_role`);

		if (
			interaction.user.id !== queue.nowPlaying().requestedBy.id &&
			!interaction.member.roles.cache.has(roll)
		) {
			return interaction.editReply(
				"<:worng:946623680291696660> | This command can only be used by the person who played the current track or someone who has your guild's DJ role"
			);
		}
		if (
			interaction.user.id !== queue.nowPlaying().requestedBy.id &&
			!interaction.member.roles.cache.has(roll)
		) {
			return interaction.editReply(
				"<:worng:946623680291696660> | This command can only be used by the person who played the current track or someone who has your guild's DJ role"
			);
		}
		queue.destroy();
		return interaction.editReply("🛑 | Successfully Stopped the music");
	},
};

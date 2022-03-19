const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("previous")
		.setDescription("Play the previous song from your queue"),
	execute: async (interaction) => {
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

		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `<:worng:946623680291696660> | There is no music playing in this guild !`,
				ephemeral: true,
			});
		if (queue) {
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
			if (queue.previousTracks.length > 1) {
				const backed = queue.back();
				return await interaction.editReply(
					backed
						? `⏮️ | Now Playing the previous track from your queue!`
						: `<:worng:946623680291696660> | Failed to do that!`
				);
			} else {
				return interaction.editReply({
					content: `<:worng:946623680291696660> | There is no previous track in your queue!`,
					ephemeral: true,
				});
			}
		}
	},
};
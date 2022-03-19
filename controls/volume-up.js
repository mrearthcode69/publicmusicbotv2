module.exports = {
	execute: async (interaction) => {
		const player = interaction.client.player;

		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `<:worng:946623680291696660> |  You're not in a voice channel !`,
				ephemeral: true,
			});

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.editReply({
				content: `<:worng:946623680291696660>| - You are not in the same voice channel !`,
				ephemeral: true,
			});

		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `<:worng:946623680291696660> |  There is no music playing  in this guild !`,
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
			let volume = queue.volume;
			if (volume.value >= 100) {
				return interaction.editReply(
					`<:worng:946623680291696660> | Your volume cannot be increased as it's maxed already`
				);
			}
			volume = volume + 2;
			queue.setVolume(volume);
			return interaction.editReply(
				`<:yes_tick:946460789957607425>  | Volume increased to ${volume}`
			);
		}
	},
};

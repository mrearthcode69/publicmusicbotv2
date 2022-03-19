module.exports = {
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
			await queue.shuffle();
			return await interaction.editReply(`🔀 | Shuffled your queue`);
		}
	},
};

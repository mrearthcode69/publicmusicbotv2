const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("jump")
		.setDescription("Play a song.")
		.addNumberOption((option) =>
			option
				.setName("tracks")
				.setDescription("The number of tracks you want to jump")
				.setRequired(true)
		),
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

		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `<:worng:946623680291696660> | There is no music playing in this guild !`,
				ephemeral: true,
			});

		if (queue) {
			let skit = interaction.options.getInteger("tracks");
			if (skit > queue.tracks.length) {
				return interaction.editReply(
					`<:worng:946623680291696660> | There ain't that many songs in the queue !`
				);
			}
			let z = queue.jump(skit);
			await interaction.editReply(
				z
					? `⏩ | Skipped  ${skit} songs!`
					: `<:worng:946623680291696660> | Failed to jump ${skit} songs!`
			);
		}
	},
};

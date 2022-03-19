const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("volume")
		.setDescription("check or set your volume")
		.addIntegerOption((option) =>
			option
				.setName("volume")
				.setDescription("The volume you want to set between 1 - 100")
				.setRequired(false)
		),

	async execute(interaction) {
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
		let volume = interaction.options.getInteger("volume");

		if (queue) {
			if (!volume) {
				return interaction.editReply(
					`🔊 | Current volume set too ${queue.volume} `
				);
			}
			if (volume.value < 0 || volume.value > 100) {
				return interaction.editReply(
					`<:worng:946623680291696660> | The Volume must be within the range of 1 - 100 `
				);
			}
			let v = await queue.setVolume(volume);
			return interaction.editReply(
				v
					? `🔊 | - Volume set to ${volume}!
                             `
					: `<:worng:946623680291696660> | Failed to do that!`
			);
		}
	},
};

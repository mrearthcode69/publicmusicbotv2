module.exports = {
	name: "botDisconnect",
	execute(queue) {
		queue.metadata.channel.send(
			"<:worng:946623680291696660> | I was disconnected from the voice channel."
		);
	},
};

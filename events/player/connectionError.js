module.exports = {
	name: "connectionError",
	execute(queue, error) {
		console.log(error);
		queue.metadata.channel.send(`<:worng:946623680291696660> | An error occurred `);
	},
};

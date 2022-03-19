module.exports = {
	name: "error",
	execute(queue, error) {
		console.log(error);
		queue.metadata.channel.send(`<:worng:946623680291696660> | An error occurred`);
	},
};

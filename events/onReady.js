const chalk = require("chalk");
module.exports = {
	name: "ready",
	once: true,

	execute(client) {
		client.user.setActivity(`/help | notex.us.to | ${client.guilds.cache.size}`, { type: "LISTENING" });

		console.log(
			chalk.yellowBright.bold(`
Notex DJ IS ONLINE MADE BY Frosty                                                    
  `)
		);
		console.log(
			chalk.green.bold(`[Notex DJ] | Logged in as ${client.user.tag}!`)
		);
		console.log(
			chalk.yellow.bold(`[Notex DJ] | Servers! ["${client.guilds.cache.size}"]`)
		);
		console.log(
			chalk.red.bold(`[Frosty] | Notex DJ Users! ["${client.users.cache.size}"]`)
		);
		console.log(
			chalk.cyan.bold(`[Frosty]! ["${client.channels.cache.size}"]`)
		);
		console.log(chalk.greenBright(`[Frosty] |Notex DJ ready (/) commands`));
	},
};

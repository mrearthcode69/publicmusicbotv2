const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
  MessageSelectMenu,
	Permissions,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("List all commands of bot"),

	async execute(interaction) {
		const commands = interaction.client.slashCommands;
		const client = interaction.client;

		const embed = new MessageEmbed()
        .setTitle(`Commands of ${client.user.username}`)
        .setColor('#2F3136')
        .setDescription('**Please Select a category to view all its commands**')
        .addField('<a:alerta:954023157285670912> INFORMATION',`[**Mr.Earth Codes**](https://discord.gg/kFA4ebACzq)`,)
        .setTimestamp()
        .setFooter(`Requested by ${interaction.user.username} | Notex.us.to`, interaction.user.displayAvatarURL());
        
          const giveaway = new MessageEmbed()
          .setTitle("Categories » MUSIC")
          .setColor('#2F3136')
          .setDescription("\n<a:audio_va:946749995778990120> Here are the music commands <a:audio_va:946749995778990120> ")
          .addFields({ name: '<a:arrow:952494138564157490> MUSIC COMMAND'  , value: `8D , autoplay , bassboost , clearqueue , earrape , jump , leave , lyrics , nowplaying , pause , play , previous , queue , repeat , requester , resume , reverse , save , seek , shuffle , skip , stop , volume`, inline: true }, )
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | Notex.us.to`, interaction.user.displayAvatarURL());
        
        
          const general = new MessageEmbed()
          .setTitle("Categories » INFORMATION")
          .setColor('#2F3136')
          .setDescription("\n<a:alerta:954023157285670912> Here are the information bot commands <a:alerta:954023157285670912>")
          .addFields({ name:'<a:arrow:952494138564157490> INFO COMMAND'  , value: `help , dj_role , commands_channel , reset_commandschannel , eval , blacklist_role`, inline: true },)
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | Notex.us.to`, interaction.user.displayAvatarURL());
        
          const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Please Select a Category")
                .setDisabled(state)
                .addOptions([{
                        label: `MUSIC COMMAND`,
                        value: `giveaway`,
                        description: `View all the music based commands!`,
                        emoji: `<a:audio_va:946749995778990120>`
                    },
                    {
                        label: `INFORMATION COMMAND`,
                        value: `general`,
                        description: `View all the INFORMATION bot commands!`,
                        emoji: `<a:alerta:954023157285670912>`
                    }
                ])
            ),
        ];
        
        const initialMessage = await interaction.editReply({ embeds: [embed], components: components(false) });
        
        const filter = (interaction) => interaction.user.id === interaction.member.id;
        
                const collector = interaction.channel.createMessageComponentCollector(
                    {
                        filter,
                        componentType: "SELECT_MENU",
                        time: 300000
                    });
        
                collector.on('collect', (interaction) => {
                    if (interaction.values[0] === "giveaway") {
                        interaction.update({ embeds: [giveaway], components: components(false) });
                    } else if (interaction.values[0] === "general") {
                        interaction.update({ embeds: [general], components: components(false) });
                    }
                });
                collector.on('end', () => {
                  initialMessage.edit({ components: components(true) });
              }
              )
    },
};
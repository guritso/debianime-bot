export default class {
  constructor() {
    this.data = {
      name: "help",
      description: "show the command's description",
      aliases: ["h", "info", "cmds"],
      permissionsBot: ["EmbedLinks", "SendMessages"],
    };
  }
  async execute(message, args, client) {
    const { messageCommands, config, database } = client;
    const { prefix } = database.cache.get(message.guildId);

    const embed = {
      author: {
        name: `Help in ${message.guild.name}`,
        icon_url: message.guild.iconURL(),
      },
      description: "",
      color: config.color.int.primary,
    };

    let m = "`";

    if (!args.length) {
      messageCommands.forEach((cmd) => {
        embed.description +=
          `${m + prefix + cmd.data.name + m} - **${cmd.data.description}**\n` +
          `Aliases: _${cmd.data.aliases.join(", ")}_\n`;
      });
    } else {
      const name = args.shift().toLowerCase();
      const cmd = await messageCommands.find(
        (c) => c.data.aliases.includes(name) || c.data.name == name
      );

      embed.description =
        `${m + prefix + cmd.data.name + m} - **${cmd.data.description}**\n` +
        `Aliases: _${cmd.data.aliases.join(", ")}_\n`;
    }

    message.reply({ embeds: [embed] });
  }
}

export default class {
  constructor() {
    this.data = {
      name: "help",
      description: "show the command's description",
      aliases: ["h", "info"],
      permissionsBot: ["EmbedLinks", "SendMessages"],
    };
  }
  async execute(message, args, client) {
    const { messageCommands } = client;

    const embed = {
      title: "Help",
      fields: [],
      color: client.color.int.primary,
    };

    if (!args.length) {
      messageCommands.forEach((cmd) => {
        embed.fields.push({
          name: cmd.data.name,
          value: cmd.data.description,
        });
      });
    } else {
      const name = args.shift();
      const cmd = await messageCommands.find(
        (cmd) => cmd.aliases.includes(name) || cmd.name == name
      );
      embed.fields.push({
        name: cmd.data.name,
        value: cmd.data.description,
      });
    }

    message.channel.send({
      embeds: [embed],
    });
  }
}

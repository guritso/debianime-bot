export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "ping",
      description: "send the ping",
      guild: true
    };
  }
  async execute(interaction, client) {
    const bot = Date.now() - interaction.createdTimestamp;
    const api = Math.round(client.ws.ping);

    const embed = {
      title: "PING",
      fields: [
        { name: "BOT:", value: `${bot}ms`, inline: true },
        { name: "API:", value: `${api}ms`, inline: true },
      ],
      color: client.config.color.int.primary,
    };

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }
}

export default class {
  constructor() {
    this.data = {
      name: "ping",
      description: "send the ping",
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
      color: 0xff0044,
    };

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }
}

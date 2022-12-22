export default class {
  constructor() {
    this.data = {
      name: "ping",
      description: "send de ping",
    };
  }
  async execute(interaction, client) {
    const lat = Date.now() - interaction.createdTimestamp;
    const api = Math.round(client.ws.ping);
    const msg1 = "`latency:`" + `**${lat}ms**\n`;
    const msg2 = "`api   :`" + `**${api}ms**`;
    interaction.reply({
      content: msg1 + msg2,
      ephemeral: true
  })
  }
}

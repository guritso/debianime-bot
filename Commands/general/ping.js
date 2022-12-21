export default class {
  constructor() {}
  async execute(interaction) {
    const lat = Date.now() - inter.createdTimestamp;
    const api = Math.round(client.ws.ping);
    const msg1 = "`latency:`" + `**${lat}ms**\n`;
    const msg2 = "`api`   :" + `**${api}ms**`;
    interaction.reply({ content: msg1 + msg2 });
  }
}

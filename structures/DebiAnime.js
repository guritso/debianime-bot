import { Client, GatewayIntentBits } from "discord.js";

export default class DebiAnime extends Client {
  constructor(options = {}) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      presence: {
        activities: [{ name: "building..", type: 0 }],
        status: "online",
      },
    });
    this.loader(options);
  }
  loader(options) {
    this.token = options.bot.TOKEN;
  }
  async start() {
    await super.login();
  }
}

import { Client } from "discord.js";
import { clientOptions } from "./clientOptions.js";
import Events from "./Events.js";

export default class DebiAnime extends Client {
  constructor(options = {}) {
    super(clientOptions);
    this.loader(options);
  }

  loader(options) {
    this.token = options.bot.TOKEN;
  }

  async start() {
    await new Events(this).load();
    await super.login();
  }
}

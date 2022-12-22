import { clientOptions } from "../Configs/clientOptions.js";
import { Client, Collection } from "discord.js";
import Logs from "../Utils/Logs.js";
import Handler from "./Handler.js";
import Events from "./Events.js";
import Slash from "./Slash.js";

export default class DebiAnime extends Client {
  constructor(options = {}) {
    super(clientOptions);

    this.commands = new Collection();
    this.logs = new Logs();
    this.loader(options);
  }

  loader(options) {
    this.token = options.bot.TOKEN;
    this.guild = options.guild;
    this.bot = options.bot;
  }

  async start() {
    await new Events(this).execute(this.logs);
    await new Slash(this).execute(this.logs);
    await new Handler(this).execute(this.logs);
    await super.login();
    await this.logs.start();
  }
}

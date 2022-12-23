import { clientOptions } from "../Configs/clientOptions.js";
import { Client, Collection } from "discord.js";
import Logs from "../Utils/Logs.js";
import Handler from "./Handler.js";
import Events from "./Events.js";
import Slashes from "./Slashes.js";

export default class DebiAnime extends Client {
  constructor(options = {}) {
    super(clientOptions);

    this.commands = new Collection();
    this.loader(options);

    this.slashes = new Slashes(this);
    this.handler = new Handler(this);
    this.events = new Events(this);

    this.logs = new Logs();
  }

  loader(options) {
    this.token = options.bot.TOKEN;
    this.guild = options.guild;
    this.bot = options.bot;
  }

  async start() {
    await this.logs.execute();

    await this.slashes.execute(this.logs);
    await this.handler.execute(this.logs);
    await this.events.execute(this.logs);
    await this.login();
  }
}

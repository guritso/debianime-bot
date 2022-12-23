import { clientOptions } from "../Configs/clientOptions.js";
import { Client, Collection } from "discord.js";
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
  }

  loader(options) {
    this.token = options.bot.TOKEN;
    this.guild = options.guild;
    this.bot = options.bot;
    this.color = options.color;
  }

  async start() {
    await this.slashes.execute();
    await this.handler.execute();
    await this.events.execute();
    await this.login();
  }
}

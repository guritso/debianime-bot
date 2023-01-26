import { clientOptions } from "../Configs/clientOptions.js";
import { Client, Collection } from "discord.js";
import validate from "../Utils/validate.js";
import Loader from "../Utils/Loader.js";

export default class DebiAnime extends Client {
  constructor(config) {
    super(clientOptions);
    this.config = validate(config);

    this.interactionCommands = new Collection();
    this.messageCommands = new Collection();
  }

  async start() {
    await new Loader(this).execute();
    await super.login(this.config.bot.token);
  }
}

import { Routes, REST } from "discord.js";

export default class Handler {
  constructor(client) {
    this.commands = client.commands;
    this.botID = client.bot.ID;
    this.botTOKEN = client.bot.TOKEN;
  }
  async execute() {
    const rest = new REST({ version: "10" }).setToken(this.botTOKEN);
    const slashComands = [];

    this.commands.forEach((cmd) => {
      slashComands.push(cmd.data);
    });

    if (slashComands.length) {
      await rest.put(Routes.applicationCommands(this.botID), {
        body: slashComands,
      });
    }
  }
}

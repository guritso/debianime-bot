import { Routes, REST } from "discord.js";

export default class Handler {
  constructor(client) {
    this.commands = client.commands;
    this.botID = client.bot.ID;
    this.botTOKEN = client.bot.TOKEN;
  }
  async execute(logs) {
    logs.start(Handler.name);
    const rest = new REST({ version: "10" }).setToken(this.botTOKEN);
    const slashComands = [];

    this.commands.forEach(async (cmd) => {
      slashComands.push(cmd.data);
    });
    if (!slashComands.length) return;
    await rest.put(Routes.applicationCommands(this.botID), {
      body: slashComands,
    });

    logs.end();
    console.log(slashComands);
  }
}

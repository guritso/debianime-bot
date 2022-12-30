import { Routes, REST } from "discord.js";

export default class Handler {
  constructor(client) {
    this.interCommands = client.interactionCommands;
    this.botID = client.bot.ID;
    this.guildID = client.guild.ID;
    this.botTOKEN = client.bot.TOKEN;
  }
  async execute() {
    const rest = new REST({ version: "10" }).setToken(this.botTOKEN);
    const interCommandsArray = new Array();

    await this.interCommands.forEach((cmd) => {
      interCommandsArray.push(cmd.data);
    });
    const length = interCommandsArray.length;

    if (!length) return;

    await rest.put(Routes.applicationGuildCommands(this.botID, this.guildID), {
      body: interCommandsArray,
    });
    console.log(` • Registered ${length} commands`);
  }
}

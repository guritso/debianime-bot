import { Routes, REST } from "discord.js";

export default class Handler {
  constructor(client) {
    this.interCommands = client.interactionCommands;
    this.botID = client.bot.ID;
    this.guildID = client.guild.ID;
    this.botTOKEN = client.bot.TOKEN;
  }
  async execute() {
    const rest = new REST({ version: "10" });
    rest.setToken(this.botTOKEN);

    const interCommandsArray = [];

    await this.interCommands.forEach((cmd) => {
      interCommandsArray.push(cmd.data);
    });

    if (!interCommandsArray.length) return;

    for (let item of interCommandsArray) {
    }

    const array = await rest.put(
      Routes.applicationGuildCommands(this.botID, this.guildID),
      {
        body: interCommandsArray,
      }
    );

    for (let item of array) {
      console.log(` • ${item.id}:${item.name}`);
    }
  }
}

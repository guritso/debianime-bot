import { Routes, REST } from "discord.js";

export default class Handler {
  constructor(client) {
    this.interCommands = client.interactionCommands;
    this.botID = client.bot.ID;
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

    await rest.put(Routes.applicationCommands(this.botID), {
      body: interCommandsArray,
    });
  }
}

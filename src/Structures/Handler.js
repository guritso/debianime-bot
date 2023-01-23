import { Routes, REST } from "discord.js";

export default class Handler {
  constructor(client) {
    this.interCommands = client.interactionCommands;
    this.config = client.config;
  }
  async execute() {
    const { bot, guild } = this.config;
    const rest = new REST({ version: "10" }).setToken(bot.token);
    const globalCommandsArray = [];
    const guildCommandsArray = [];

    await this.interCommands.forEach((cmd) => {
      if (cmd.data.guild) {
        guildCommandsArray.push(cmd.data);
      } else {
        globalCommandsArray.push(cmd.data);
      }
    });

    const length_global = globalCommandsArray.length;
    const length_guild = guildCommandsArray.length;

    if (length_guild)
      await rest.put(Routes.applicationGuildCommands(bot.id, guild.id), {
        body: guildCommandsArray,
      });

    if (length_global)
      await rest.put(Routes.applicationCommands(bot.id), {
        body: globalCommandsArray,
      });

    console.log(`  • Registered ${length_global} global commands`);
    console.log(`  • Registered ${length_guild} guild commands`);
  }
}

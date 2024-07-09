export default class {
  constructor() {
    this.data = {
      name: "mudae",
      description: "Add react to Mudae bot rolls",
      aliases: ["react", "mu", "rolls"],
      permissionsBot: ["AddReactions"],
      permissionsUser: ["ManageMessages"],
    };
  }

  async execute(message, args, client) {
    const { database } = client;
    const guildId = message.guild.id;
    const mudaeStatus = database.cache.get(guildId)?.mudae;

    const newStatus = !mudaeStatus;
    database.set(guildId, { mudae: newStatus });

    const statusMessage = newStatus ? "on :white_check_mark:" : "off :x:";
    message.reply(`\`React to Mudae: ${statusMessage}\``);
  }
}

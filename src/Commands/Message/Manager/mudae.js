export default class {
  constructor() {
    this.data = {
      name: "mudae",
      description: "Add react to Mudae bot messages on/off",
      aliases: ["react"],
      permissionsBot: ["AddReactions"],
      permissionsUser: ["Administrator"],
    };
  }
  async execute(message, args, client) {
    const { database } = client;
    const { mudae } = database.cache.get(message.guildId);

    let change;

    if (!mudae) {
      database.set(message.guild.id, { mudae: true });
      change = "on :white_check_mark:";
    } else {
      database.set(message.guild.id, { mudae: false });
      change = "off :x:";
    }

    message.reply("`React to Mudae: `" + change);
  }
}

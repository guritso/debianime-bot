export default class {
  constructor() {
    this.data = {
      name: "prefix",
      description: "change the bot's prefix",
      aliases: ["px", "pf"],
      permissionsBot: ["EmbedLinks", "SendMessages"],
      permissionsUser: ["Administrator"],
      strings: {
        specify: "> You need to specify a prefix!",
        changed: "> Prefix changed to ",
      },
    };
  }
  async execute(message, args, client) {
    const { bot, color, database } = client;
    const { specify, changed } = this.data.strings;
    const newPrefix = args.shift();

    if (newPrefix) {
      await database.set(message.guild.id, { prefix: newPrefix });
      return message.reply(`${changed} ${code(newPrefix)}!`);
    } else {
      message.reply(specify);
    }

    function code(arg) {
      return "`" + arg + "`";
    }
  }
}

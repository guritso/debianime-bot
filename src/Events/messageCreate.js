export default class {
  constructor() {
    this.once = false;
  }
  async execute(message) {
    if (message.author.bot) return;

    const client = message.client;
    const prefix = client.bot.prefix;

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.trim().slice(prefix.length).split(/ +/g);

    const messageCommands = client.messageCommands;
    const commandName = args.shift().toLowerCase();
    const command = messageCommands.get(commandName);

    if (!command) return;

    try {
      command.execute(message, args, client);
    } catch (err) {
      console.log(err);
    }
  }
}

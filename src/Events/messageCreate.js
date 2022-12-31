export default class {
  constructor() {
    this.once = false;
  }
  async execute(message) {
    if (message.author.bot) return;

    const client = message.client;
    const prefix = client.bot.prefix;
    const args = message.content;

    if (!args.startsWith(prefix)) return;

    const msgCommands = client.messageCommands;
    const commandName = args.split(" ").shift().slice(prefix.length);

    const command = msgCommands.get(commandName);

    try {
      command.execute(message, args, client);
    } catch (err) {
      console.log(err);
    }
  }
}

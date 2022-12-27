export default class {
  constructor(client) {
    this.client = client;
  }
  async execute(message) {
    if (message.author.bot) return;
    const client = this.client
    const args = message.content;
    const msgCommands = this.client.messageCommands;
    const commandName = args.split(" ").shift().slice(client.bot.prefix.length);
    console.log(commandName)
    const command = msgCommands.get(commandName);
    console.log(command)

    try {
      command.execute(message, args, client);
    } catch (err) {
      console.log(err);
    }
  }
}

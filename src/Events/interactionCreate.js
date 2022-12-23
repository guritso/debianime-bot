export default class {
  constructor(client) {
    this.client = client;
  }
  async execute(interaction) {
    const client = this.client;
    const commandName = interaction.commandName;
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      command.execute(interaction, client);
    } catch (err) {
      console.log(err);
    }
  }
}

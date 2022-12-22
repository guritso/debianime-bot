export default class {
  constructor(client) {
    this.client = client;
  }
  async execute(interaction) {
    const client = this.client;
    const commandName = interaction.commandName;
    const command = client.commands.get(commandName);
    
    command.execute(interaction, client);
  }
}

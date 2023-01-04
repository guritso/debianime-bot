export default class {
  constructor() {
    this.data = {
      name: "channel",
      description: "manage channels",
      dm_permissions: "0",
      options: [
        {
          name: "rename",
          description: "rename a channel",
          type: 1,
          options: [
            {
              name: "channel",
              description: "select the channel",
              required: true,
              type: 7,
            },
            {
              name: "name",
              description: "choose a new name",
              required: true,
              type: 3,
            },
          ],
        },
      ],
      permissions: ["ManageChannels", "ViewChannel"],
    };
  }
  async execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();
    const Command = await import(`./channel/${subCommand}.js`);
    const command = new Command.default();
    command.execute(interaction);
  }
}

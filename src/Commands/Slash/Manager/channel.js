export default class {
  constructor() {
    this.data = {
      name: "channel",
      description: "manage channels",
      dm_permissions: false,
      default_member_permissions: 1 << 4, // ManageChannels
      options: [
        {
          name: "rename",
          description: "rename a channel",
          type: 1,
          options: [
            {
              name: "new_name",
              description: "choose a new name",
              required: true,
              type: 3,
            },
            {
              name: "channel",
              description: "select the channel (optional)",
              type: 7,
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

export default class {
  constructor() {
    this.data = {
      name: "channel",
      description: "manage channels",
      dm_permission: false,
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
              required: false,
            },
          ],
        },
        {
          name: "delete",
          description: "delete a channel",
          type: 1,
          options: [
            {
              name: "channel",
              description: "select the channel",
              required: true,
              type: 7,
            },
          ],
        },
      ],
      permissions: ["ManageChannels", "ViewChannel"],
    };
  }
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();

    const subCommands = {
      rename: async () => {
        const { color } = interaction.client.config;
        const giveChannel = interaction.options.getChannel("channel");
        const newName = interaction.options.getString("new_name");
        const channel = giveChannel || interaction.channel;
        const oldName = channel.name;

        if (!channel.manageable)
          return interaction.reply({
            content: `> I don't have permission in ${oldName}`,
            ephemeral: true,
          });

        await channel.setName(newName);

        const embed = {
          title: "Channel Renamed",
          color: color.int.primary,
          description: `**OLD:** ${oldName}\n**NEW:** ${newName}`,
        };

        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
      },
      delete: async () => {
        const giveChannel = interaction.options.getChannel("channel");
        const channel = giveChannel;
        const oldName = channel.name;

        if (!channel.manageable)
          return interaction.reply({
            content: `> I don't have permission in ${oldName}`,
            ephemeral: true,
          });

        await channel.delete();

        interaction.reply({
          content: `> Channel ${oldName} deleted`,
          ephemeral: true,
        });
      },
    };

    subCommands[subCommand]();
  }
}

export default class {
  constructor() {}
  async execute(interaction) {
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
  }
}

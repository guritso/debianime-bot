export default class {
  constructor() {}
  async execute(interaction) {
    const { color } = interaction.client;
    const channel = interaction.options.getChannel("channel");
    const oldName = channel.name;
    const newName = interaction.options.getString("name");

    try {
      await channel.setName(newName);
    } catch (err) {
      return interaction.reply({
        content: `> I don't have acess to ${oldName}`,
        ephemeral: true,
      });
    }

    const embed = {
      title: "Channel Renamed",
      color: color.int.primary,
      fields: [
        { name: "From", value: oldName },
        { name: "To", value: newName },
      ],
    };

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }
}

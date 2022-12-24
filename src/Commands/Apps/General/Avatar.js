export default class {
  constructor() {
    this.data = {
      name: "Avatar",
      type: 2,
    };
  }
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const author = interaction.user;

    const embed = {
      title: user.tag,
      color: client.color.int.primary,
      image: {
        url: user.avatarURL({ size: 2048 }),
      },
      footer: {
        text: `Requested by ${author.tag}`,
        icon_url: author.avatarURL(),
      },
    };

    interaction.reply({ embeds: [embed] });
  }
}

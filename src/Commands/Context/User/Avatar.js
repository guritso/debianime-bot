export default class {
  constructor() {
    this.data = {
      name: "Avatar",
      type: 2,
    };
  }
  async execute(interaction, client) {
    const user = interaction.options.getMember("user");
    const author = interaction.member;
    
    const MSG = "Requested by"

    const embed = {
      title: user.nickname || user.user.username,
      color: client.color.int.primary,
      image: {
        url: user.displayAvatarURL({ size: 2048 }),
      },
      footer: {
        text: `${MSG} ${author.nickname || author.user.username}`,
        icon_url: author.displayAvatarURL(),
      },
    };

    interaction.reply({ embeds: [embed] });
  }
}

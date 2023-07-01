export default class {
  constructor() {
    this.data = {
      name: "Avatar",
      type: 2,
      dm_permission: false,
    };
  }
  async execute(interaction, client) {
    const { color } = client.config;
    const target = interaction.options.getMember("user");
    const author = interaction.member;
    const MSG = "Requested by";

    const embed = {
      title: target.nickname || target.user.username,
      color: color.int.primary,
      image: {
        url: target.displayAvatarURL({ size: 2048 }),
      },
      footer: {
        text: `${MSG} ${author.nickname || author.user.username}`,
        icon_url: author.displayAvatarURL(),
      },
    };

    interaction.reply({ embeds: [embed] });
  }
}

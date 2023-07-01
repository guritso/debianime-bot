export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "avatar",
      description: "send your and others avatar",
      dm_permission: false,
      options: [
        {
          name: "user",
          description: "select the user",
          type: 6,
          required: false,
        },
      ],
    };
  }
  async execute(interaction, client) {
    const { color } = client.config;
    const target = interaction.options.getMember("user");
    const author = interaction.member;
    const member = target || author;

    const embed = {
      title: member.nickname || member.user.username,
      color: color.int.primary,
      image: {
        url: member.displayAvatarURL({ size: 2048 }),
      },
      footer: {
        text: `Requested by ${author.nickname || author.user.username}`,
        icon_url: author.displayAvatarURL(),
      },
    };

    interaction.reply({ embeds: [embed] });
  }
}

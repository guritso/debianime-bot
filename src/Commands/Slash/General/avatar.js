export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "avatar",
      description: "send your and others avatar",
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
    const user = interaction.options.getUser("user");
    const author = interaction.user;
    const member = user || author;

    if (!member) {
      interaction.reply({
        content: "Something's wrong",
        ephemeral: true,
      });
    }
    const embed = {
      title: member.tag,
      color: color.int.primary,
      image: {
        url: member.avatarURL({ size: 2048 }),
      },
      footer: {
        text: `Requested by ${author.tag}`,
        icon_url: author.avatarURL(),
      },
    };

    interaction.reply({ embeds: [embed] });
  }
}

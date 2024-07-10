export default class {
  constructor() {
    this.data = {
      name: "tracemoe",
      description: "Search anime by image",
      type: 1,
      options: [
        {
          name: "image",
          description: "The image to search",
          type: 11,
          required: true,
        },
      ],
    };
  }

  async execute(interaction) {
    interaction.deferReply();

    const image = interaction.options.getAttachment("image");
    const response = await fetch(
      `https://api.trace.moe/search?url=${encodeURIComponent(image.url)}`
    ).then((e) => e.json());

    const result = response?.result?.shift();

    if (!result) {
      return interaction.editReply({ content: "No result found" });
    }

    const embed = {
      title: result.filename,
      url: result.video,
      color: interaction.client.config.color.int.primary,
      author: {
        name: "Anilist",
        icon_url: "https://anilist.co/img/icons/apple-touch-icon.png",
        url: `https://anilist.co/anime/${result.anilist}`,
      },
      image: {
        url: result.image,
      },
      fields: [
        {
          name: "EPISODE",
          inline: true,
          value: `\`\`\`${result.episode}\`\`\``,
        },
        {
          name: "FROM",
          inline: true,
          value: `\`\`\`${formatSeconds(result.from)}\`\`\``,
        },
        {
          name: "TO",
          inline: true,
          value: `\`\`\`${formatSeconds(result.to)}\`\`\``,
        },
        {
          name: "SIMILARITY",
          inline: true,
          value: `\`\`\`${result.similarity}%\`\`\``,
        },
      ],
      footer: {
        text: "Powered by trace.moe",
      },
    };
    interaction.editReply({ embeds: [embed] });

    function formatSeconds(seconds) {
      const min = Math.floor(Math.round(seconds) / 60);
      const sec = Math.floor(Math.round(seconds) % 60);

      return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }
  }
}

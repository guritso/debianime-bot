import Permission from "../Utils/Permission.js";

export default class {
  constructor() {
    this.once = false;
  }

  async execute({ client, anime }) {
    const { title, link, episode, image, pubDate } = anime;
    const { database, config } = client;

    const permission = new Permission()
      .setMemberId(client.user.id)
      .setNeeded(["EmbedLinks", "SendMessages"]);

    const embed = {
      title: `${title.split("#")[0]}`,
      description: `Episode ${episode} is out!`,
      color: config.color.int.primary,
      image: {
        url: image,
      },
      footer: {
        text: `${pubDate}`,
      },
      url: link,
    };

    client.guilds.cache.forEach(async (guild) => {
      const channel = guild.channels.cache.get(
        database.cache.get(guild.id).channels.anime_channel
      );

      permission.setChannel(channel);

      const missing = await permission.getMissing();

      if (channel && !missing) {
        channel.send({ embeds: [embed] });
      }
    });
  }
}

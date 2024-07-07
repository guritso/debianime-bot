export default class {
  constructor() {
    this.once = false;
  }

  async execute({ client, anime }) {
    const { title, link, episode, image, pubDate } = anime;
    const { database, config } = client;

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

    client.guilds.cache.forEach((guild) => {
      const channel = guild.channels.cache.get(database.cache.get(guild.id).channels.anime_channel);
      if (channel) {
        channel.send({ embeds: [embed] });
      }
    });
  }
}

export default class {
  constructor() {
    this.once = false;
  }

  async execute({ client, anime }) {
    const { name, episode, image } = anime;
    const { database, config } = client;

    const embed = {
      title: `${name}`,
      description: `Episode ${episode} is out!`,
      color: config.color.int.primary,
      image: {
        url: image,
      },
    };

    client.guilds.cache.forEach((guild) => {
      const channel = guild.channels.cache.get(database.cache.get(guild.id).channels.anime);
      if (channel) {
        channel.send({ embeds: [embed] });
      }
    });
  }
}

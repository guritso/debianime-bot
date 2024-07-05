export default class {
  constructor() {
    this.once = false;
  }

  async execute({ guild, user, client }) {
    const { database, config } = client;
    const channel = guild.channels.cache.get(database.cache.get(guild.id)?.channels.welcome);

    const embed = {
      color: config.color.int.primary,
      title: "Welcome to the server!",
      description: `${user.username}, Welcome to ${guild.name}!`,
      thumbnail: {
        url: user.displayAvatarURL({ dynamic: true }),
      },
    };
    channel.send({ embeds: [embed], content: `<@${user.id}>` });
  }
}

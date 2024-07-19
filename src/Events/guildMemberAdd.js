export default class {
  constructor() {
    this.once = false;
  }

  async execute({ guild, user, client }) {
    const { database, config } = client;
    const channel = guild.channels.cache.get(
      database.cache.get(guild.id)?.channels.welcome_channel
    );

    if (!channel) return;

    const permission = new Permission()
      .setMemberId(client.user.id)
      .setChannel(channel)
      .setNeeded(["EmbedLinks", "SendMessages"]);

    const missing = await permission.getMissing();

    if (missing) return;

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

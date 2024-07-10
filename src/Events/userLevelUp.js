import Permission from "../Utils/Permission.js";

export default class UserLevelUp {
  constructor() {
    this.once = false;
  }

  async execute(data) {
    const { client, guild, user } = data;
    const CHANNEL_ID = client.database.cache.get(guild.id)?.channels?.ranking_channel;
    const channel = guild.channels.cache.get(CHANNEL_ID);

    if (!channel) return;

    const permission = new Permission()
      .setMemberId(client.user.id)
      .setChannel(channel)
      .setNeeded(["EmbedLinks", "SendMessages"]);

    const missing = await permission.getMissing();

    if (missing) return;

    const EMBED = {
      title: "Level Up",
      color: client.config.color.int.primary,
      description: `${user.name} has reached level **${user.level}**!`,
    };

    if (channel) {
      channel.send({ content: `<@${user.id}>`, embeds: [EMBED] });
    }
  }
}

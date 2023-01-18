export default class LevelSystem {
  constructor(message) {
    this.body = {
      id: message.author.id,
      tag: message.author.tag,
      level: 0,
      experience: 10,
    };
    this.message = message;
  }
  async execute(database) {
    const { guild, channel, client } = this.message;
    const { id, tag } = this.body;

    if (!database.cache.get(guild.id)) {
      await database.set(guild.id, { levels: [] });
    }

    const levels = database.cache.get(guild.id).levels;
    const userData = levels.find((user) => user.id == id);

    if (!userData) {
      levels.push(this.body);
      return database.set(guild.id, { levels: levels });
    }

    const target = userData.level * 10 + 100;
    const experience = (userData.experience += 10);

    if (experience >= target) {
      userData.level++;
      userData.experience = 0;

      const embed = {
        title: "Level Up",
        color: client.color.int.primary,
        description: `${tag} as reached level **${userData.level}**!`,
      };

      const permissions = channel.permissionsFor(client.user.id);
      const isSendable = permissions.has("SendMessages");
      const isEmbedable = permissions.has("EmbedLinks");

      if (!isSendable || !isEmbedable) return;

      channel.send({
        content: `<@${id}>`,
        embeds: [embed],
      });
    }

    database.set(guild.id, { levels: levels });
  }
}

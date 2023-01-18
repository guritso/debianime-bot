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
    const { id, tag } = this.body;
    const { guild, channel } = this.message;

    if (!database.cache.get(guild.id)) {
      await database.set(guild.id);
    }

    const levels = database.cache.get(guild.id).levels;
    const userData = levels.find((l) => l.id == id);

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
        description: `${tag} as reached level **${userData.level}**!`,
      };

      channel.send({
        content: `<@${id}>`,
        embeds: [embed],
      });
    }

    database.set(guild.id, { levels: levels });
  }
}

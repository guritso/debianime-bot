export default class LevelSystem {
  constructor(message) {
    this.body = {
      id: message.author.id,
      name: message.author.username,
      level: 0,
      experience: 10,
    };
    this.message = message;
  }

  async execute(database) {
    const { guild, client } = this.message;
    const { id, name } = this.body;
    const { members, channels } = database.cache.get(guild.id);
    const userData = members.find((user) => user.id == id);

    if (!userData) {
      members.push(this.body);
      return database.set(guild.id, { members });
    }

    const experience = this.addExperience(userData);

    if (experience >= this.getTarget(userData)) {
      const userLevel = this.addLevel(userData);
      this.sendLevelUpMessage(client, guild, channels.ranking, id, name, userLevel);
    }

    return database.set(guild.id, { members });
  }

  getTarget(user) {
    return user.level * 10 + 100;
  }

  addExperience(user) {
    const EXPERIENCE_GAIN = 10;
    user.experience += EXPERIENCE_GAIN;
    return user.experience;
  }

  addLevel(user) {
    user.level++;
    user.experience = 0;
    return user.level;
  }

  async sendLevelUpMessage(client, guild, channelId, userId, userName, userLevel) {
    const embed = {
      title: "Level Up",
      color: client.config.color.int.primary,
      description: `${userName} has reached level **${userLevel}**!`,
    };

    const channel = guild.channels.cache.get(channelId);
    if (channel) {
      const permissions = channel.permissionsFor(client.user.id);
      if (permissions.has(["EmbedLinks", "SendMessages"])) {
        await channel.send({ content: `<@${userId}>`, embeds: [embed] });
      }
    }
  }
}

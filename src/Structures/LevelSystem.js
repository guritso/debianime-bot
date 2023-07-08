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
    const { guild, channel, client } = this.message;
    const { id, name } = this.body;
    // get the permissions from the channel
    const permissions = channel.permissionsFor(client.user.id);
    // get the user from the database
    const { members } = database.cache.get(guild.id);
    const userData = members.find((user) => user.id == id);
    // check if user exists, add if not
    if (!userData) {
      members.push(this.body);
      return database.set(guild.id, { members });
    }
    // add experience
    const experience = addExperience(userData);
    // add level if experience reach the target
    if (experience >= getTarget(userData)) {
      const userLevel = addLevel(userData);

      const embed = {
        title: "Level Up",
        color: client.config.color.int.primary,
        description: `${name} as reached level **${userLevel}**!`,
      };

      const isSendable = permissions.has("SendMessages");
      const isEmbedable = permissions.has("EmbedLinks");

      if (!isSendable || !isEmbedable) return;

      channel.send({
        content: `<@${id}>`,
        embeds: [embed],
      });
    }
    // save in the database
    return database.set(guild.id, { members });

    function getTarget(user) {
      return user.level * 10 + 100;
    }

    function addExperience(user) {
      return (user.experience += 10);
    }

    function addLevel(user) {
      user.level++;
      user.experience = 0;

      return user.level;
    }
  }
}

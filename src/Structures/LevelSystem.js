import LevelEvent from "../Utils/LevelEvent.js";

export default class LevelSystem extends LevelEvent {
  constructor(message) {
    super(message.client);
    this.body = {
      id: message.author.id,
      name: message.author.username,
      level: 0,
      experience: 10,
    };
    this.message = message;
  }

  async execute(database) {
    const guild = this.message.guild;
    const { members } = database.cache.get(guild.id);
    const userData = members.find((user) => user.id == this.body.id);

    if (!userData) {
      members.push(this.body);
      return database.set(guild.id, { members });
    }

    const experience = this.addExperience(userData);

    if (experience >= this.getTarget(userData)) {
      this.addLevel(userData);
      super.triggerUserLevelUp(userData, guild);
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
}

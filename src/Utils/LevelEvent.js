export default class LevelEvent {
  constructor(client) {
    this.client = client;
  }
  /**
   * Trigger a user level up event
   * @param {Object} user - The user object containing details.
   * @param {Object} guild - The guild object containing details.
   */
  triggerUserLevelUp(user, guild) {
    this.client.emit("userLevelUp", {
      client: this.client,
      guild,
      user,
    });
  }
}

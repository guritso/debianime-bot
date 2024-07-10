export default class LevelEvent {
  constructor(client) {
    this.client = client;
  }

  triggerUserLevelUp(user, guild) {
    this.client.emit("userLevelUp", {
      client: this.client,
      guild,
      user,
    });
  }
}

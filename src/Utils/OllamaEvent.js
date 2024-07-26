export default class OllamaEvent {
  constructor(client) {
    this.client = client;
  }
  async triggerAiChatMessage(user, message, data) {
    this.client.emit("aiChatMessage", {
      client: this.client,
      user,
      message,
      data,
    });
  }
}

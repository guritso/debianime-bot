export default class OllamaEvent {
  constructor(client) {
    this.client = client;
  }
  async triggerAiChatMessage(message, response) {
    this.client.emit("aiChatMessage", {
      client: this.client,
      message,
      response,
    });
  }
}

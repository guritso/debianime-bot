export default class {
  constructor() {
    this.once = false;
  }
  async execute({ client, user, message, data }) {
    if (data.message.content.length) {
      message.reply(data.message.content);
    } else {
      message.reply("No response from AI");
    }
  }
}
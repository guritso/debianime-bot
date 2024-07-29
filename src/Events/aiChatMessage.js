export default class {
  constructor() {
    this.once = false;
  }

  async execute({ client, message, response }) {
    let MSG_CONTENT = "";
    const RELOADING_EMOJI = "<a:reloading:1266901077496827962>";

    const msg = await message.reply(RELOADING_EMOJI);

    const interval = setInterval(() => {
      msg.edit(MSG_CONTENT);
    }, 1000);

    try {
      for await (const chunk of response) {
        MSG_CONTENT = MSG_CONTENT.replace(RELOADING_EMOJI, "");
        MSG_CONTENT += chunk.message.content + RELOADING_EMOJI;
      }
    } catch (error) {
      clearInterval(interval);

      return msg.edit("A error ocurred, try again later.");
    }

    clearInterval(interval);

    msg.edit(MSG_CONTENT.replace(RELOADING_EMOJI, ""));

    const assistantTemplate = {
      role: "assistant",
      content: MSG_CONTENT,
    };

    client.ollamaai.messages.push(assistantTemplate);
  }
}

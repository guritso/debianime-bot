import { Ollama } from "ollama";
import OllamaEvent from "../Utils/OllamaEvent.js";

export default class OllamaAI extends Ollama {
  constructor({ config }) {
    super({ host: config.ollama.host });
    this.model = config.ollama.model;
    this.system = config.ollama.system;
    this.messages = [
      {
        role: "system",
        content: this.system.replace("{{ bot.name }}", config.bot.name),
      },
    ];
    this.options = {
      temperature: 0.3,
    };
    this.models = [];
  }

  async execute() {
    const { models } = await super.list();

    for await (const { model } of models) {
      this.models.push(model);
      if (model == this.model) {
        console.log(`  • ${model} <--`);

        const response = await super
          .chat({
            model: this.model,
            messages: this.messages,
          })
          .catch((e) => {
            return {
              message: {
                content: `${e.cause.code}: ${e.cause.socket.remoteAddress} ${e.message}, ${e.cause.message}`,
              },
            };
          });

        console.log(`    ↳ ${response.message.content}`);
      } else {
        console.log(`  • ${model}`);
      }
    }
  }
  async chat(message) {
    const ollamaEvent = new OllamaEvent(message.client);

    message.channel.sendTyping().catch(() => {});

    const userTemplate = {
      role: "user",
      content: `${message.author.username}: ${message.content}`,
    };

    this.messages.push(userTemplate);

    const response = await super
      .chat({
        model: this.model,
        stream: true,
        options: this.options,
        messages: this.messages,
        keep_alive: -1,
      })
      .catch(() => {
        return message.channel.send("Something went wrong, please try again later...").catch(() => {});
      });

    ollamaEvent.triggerAiChatMessage(message, response);
  }
  async setModel(model) {
    this.model = model;
  }
}

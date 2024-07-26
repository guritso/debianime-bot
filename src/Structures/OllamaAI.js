import { Ollama } from "ollama";
import OllamaEvent from "../Utils/OllamaEvent.js";

export default class OllamaAI extends Ollama {
  constructor({ config }) {
    super({ host: config.ollama.host });
    this.model = config.ollama.model;
    this.assistant = config.ollama.assistant;
    this.system = config.ollama.system;
    this.messages = [
      {
        role: "system",
        content: this.system,
      },
      {
        role: "assistant",
        content: `Oh, you want me to channel my inner tsundere, huh? Well, fine! Baka! 😒`,
      },
    ];
    this.options = {
      temperature: 1,
    };
  }
  async execute(client) {
    const { models } = await super.list();

    await super.chat({
      model: this.model,
      messages: this.messages,
    });

    for await (const model of models) {
      if (model.model == this.model) {
        console.log(`  • ${model.name} <--`);
      } else {
        console.log(`  • ${model.name}`);
      }
    }
  }
  async chat(username, message) {
    const ollamaEvent = new OllamaEvent(message.client);

    message.channel.sendTyping().catch(() => {});

    const userTemplate = {
      role: "user",
      content: `${username}: ${message.content}`,
    };

    this.messages.push(userTemplate);

    const response = await super
      .chat({
        model: this.model,
        options: this.options,
        messages: this.messages,
      })
      .catch((error) => {
        console.log(error);
        return {
          message: {
            content: "Something went wrong, please try again later...",
            error: true,
          },
        };
      });

    if (response.message.error) {
      return message.channel.send(response.message.content).catch(() => {});
    }

    const assistantTemplate = {
      role: "assistant",
      content: response.message.content,
    };

    this.messages.push(assistantTemplate);
    ollamaEvent.triggerAiChatMessage(username, message, response);
  }
  async setModel(model) {
    this.model = model;
  }
  async setAssistant(assistant) {
    this.assistant = assistant;
  }
}

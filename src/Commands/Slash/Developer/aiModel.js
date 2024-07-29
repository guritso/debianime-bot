import { StringSelectMenuBuilder } from "discord.js";

export default class {
  constructor() {
    this.data = {
      name: "ai-model",
      description: "Set the ollama model",
      guild: true,
    };
  }
  async execute(interaction) {
    const { client } = interaction;
    const models = client.ollamaai.models;

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("ai-model")
      .setPlaceholder("Select a model")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        models.map((model) => ({
          label: model,
          value: model,
        }))
      );

    const response = await interaction.reply({
      content: "Select a model",
      components: [{ type: 1, components: [selectMenu] }],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 30000,
      });

      const model = confirmation.values[0];

      client.ollamaai.model = model;

      await confirmation.update({
        content: `- Model set to \`\`\`${model}\`\`\``,
        components: [],
      });

    } catch (e) {
      await interaction.editReply({
        content: "You took too long to respond, please try again.",
        components: [],
      }).catch(() => {});
    }
  }
}

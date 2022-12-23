export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "say",
      description: "Say something",
      options: [
        {
          name: "message",
          description: "Write a message",
          type: 3,
          required: true,
        },
      ],
    };
  }
  async execute(interaction) {
    const message = interaction.options.getString("message");
    interaction.channel.send(message);
    interaction.reply({
      content:"√",
      ephemeral: true
    })
  }
}

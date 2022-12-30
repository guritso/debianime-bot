import Permission from "../../../Utils/Permission.js";

export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "prune",
      description: "Prune up to 100 messages",
      dm_permission: false,
      default_member_permissions: 1 << 13,
      options: [
        {
          name: "ammount",
          description: "Define the ammount of messages",
          required: true,
          type: 4,
        },
      ],
      permissions: ["ReadMessageHistory", "ManageMessages", "ViewChannel"],
    };
    this.strings = {
      invalid: "> Invalid ammount! `0 < ammount < 100`",
      deleted: "messages deleted!",
    };
  }
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    const { invalid, missing, deleted } = this.strings;
    const ammount = interaction.options.getInteger("ammount");

    if (1 > ammount || ammount > 100) {
      return interaction.editReply(invalid);
    }

    const messages = await interaction.channel.bulkDelete(ammount);

    interaction.editReply({
      content: `> **${messages.size}** ${deleted}`,
    });
  }
}

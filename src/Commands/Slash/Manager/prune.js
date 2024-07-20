import Permission from "../../../Utils/Permission.js";

export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "prune",
      description: "Prune up to 100 messages",
      dm_permission: false,
      default_member_permissions: 1 << 13, // ManageMessages
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
      invalid: "> Invalid ammount! `1 < ammount < 100`",
      deleted: "messages deleted!",
      error: "> I can't delete messages from 14 days ago!",
    };
  }
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    const { invalid, error, deleted } = this.strings;
    const ammount = interaction.options.getInteger("ammount");

    if (2 > ammount || ammount > 100) {
      return interaction.editReply(invalid);
    }

    const messages = await interaction.channel
      .bulkDelete(ammount)
      .catch(() => {});

    if (!messages) {
      return interaction.editReply(error);
    }
    interaction.editReply({
      content: `> **${messages.size}** ${deleted}`,
    });
  }
}

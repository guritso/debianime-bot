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
    };
    this.strings = {
      invalid: "> Invalid ammount! `0 < ammount < 100`",
      missing: "> The following permission is missing:`",
      deleted: "messages deleted!",
    };
    this.permissions = ["ReadMessageHistory", "ManageMessages", "ViewChannel"];
  }
  async execute(interaction) {
    const { invalid, missing, deleted } = this.strings;

    await interaction.deferReply({ ephemeral: true });
    const ammount = interaction.options.getInteger("ammount");
    const botPerm = interaction.appPermissions.toArray();

    if (1 > ammount || ammount > 100) {
      return interaction.editReply(invalid);
    }

    for (let i in this.permissions) {
      if (!botPerm.includes(this.permissions[i])) {
        const message = missing.concat(this.permissions[i] + "`");
        return interaction.editReply(message);
      }
    }

    await interaction.channel.bulkDelete(ammount);
    interaction.editReply(`> **${ammount}** ${deleted}`);
  }
}

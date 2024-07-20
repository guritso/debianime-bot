import Permission from "../Utils/Permission.js";

export default class {
  constructor() {
    this.once = false;
  }

  async execute(interaction) {
    const { client, commandName } = interaction;
    const commands = client.interactionCommands;
    const command = commands.get(commandName);

    await client.database.ensure(interaction.guild.id);

    if (!command) return;

    const missingPermissions = await this.checkPermissions(
      client.user.id,
      command.data.permissions,
      interaction.channel,
      client.config.color.int.red,
      `For ${client.user.tag}`,
      interaction
    );

    if (missingPermissions) return;

    command.execute(interaction, client);
  }

  async checkPermissions(
    memberId,
    neededPermissions,
    channel,
    color,
    footerText,
    interaction
  ) {
    const permission = new Permission()
      .setNeeded(neededPermissions)
      .setMemberId(memberId)
      .setChannel(channel);
    const missing = await permission.getMissing();

    if (missing) {
      const embed = {
        title: "Missing Permissions",
        color: color,
        description: missing.join("\n"),
        footer: { text: footerText },
      };
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
      return true;
    }
    return false;
  }
}

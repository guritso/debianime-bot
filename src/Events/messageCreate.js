import LevelSystem from "../Structures/LevelSystem.js";
import Permission from "../Utils/Permission.js";
import Mudae from "../Utils/Mudae.js";

export default class {
  constructor() {
    this.once = false;
  }

  async execute(message) {
    const { client, author, content, channel, guild } = message;
    const { messageCommands, config, database } = client;

    await database.ensure(guild.id);

    new Mudae().react(message);

    const { prefix } = database.cache.get(guild.id);

    if (author.bot) return;

    if (message.mentions.users.has(client.user.id)) {
      return message.reply("> My prefix is: " + prefix);
    }

    new LevelSystem(message).execute(database);

    if (!content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    const args = content.trim().slice(prefix.length).split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command =
      messageCommands.find((cmd) => cmd.data.aliases.includes(commandName)) ||
      messageCommands.get(commandName);

    if (!command) return;

    const { permissionsBot, permissionsUser } = command.data;

    const missingClient = await this.checkPermissions(
      client.user.id,
      permissionsBot,
      channel,
      config.color.int.red,
      `For ${client.user.tag}`,
      message
    );

    if (missingClient) return;

    const missingAuthor = await this.checkPermissions(
      author.id,
      permissionsUser,
      channel,
      config.color.int.red,
      `For ${author.tag}`,
      message
    );

    if (missingAuthor) return;

    command.execute(message, args, client);
  }

  async checkPermissions(
    memberId,
    neededPermissions,
    channel,
    color,
    footerText,
    message
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
      await message.member.send({ embeds: [embed] }).catch(() => {});
      return true;
    }
    return false;
  }
}

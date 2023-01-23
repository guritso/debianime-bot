import LevelSystem from "../Structures/LevelSystem.js";
import Permission from "../Utils/Permission.js";

export default class {
  constructor() {
    this.once = false;
  }
  async execute(message) {
    const { client, author, content, channel, guild } = message;
    const { database, messageCommands, config } = client;

    await database.ensure(guild.id);

    const { prefix } = database.cache.get(guild.id);

    if (author.bot) return;

    if (message.mentions.users.has(client.user.id)) {
      return message.reply("> My prefix is: " + prefix);
    }

    const levelSystem = new LevelSystem(message);
    levelSystem.execute(database);

    if (!content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    const args = content.trim().slice(prefix.length).split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command =
      messageCommands.find((cmd) => cmd.data.aliases.includes(commandName)) ||
      messageCommands.get(commandName);

    if (!command) return;

    const { permissionsBot, permissionsUser } = command.data;

    const permission = new Permission()
      .setNeeded(permissionsBot)
      .setMemberId(client.user.id)
      .setChannel(channel);
    const missingClient = await permission.getMissing();

    const embed = {
      title: "Missing Permissions",
      color: config.color.int.red,
      footer: { text: `For ${client.user.tag}` },
    };

    if (missingClient) {
      embed.description = missingClient.join("\n");
      return message.member.send({ embeds: [embed] }).catch(() => {});
    }

    permission.setMemberId(author.id).setNeeded(permissionsUser);
    const missingAuthor = await permission.getMissing();

    if (missingAuthor) {
      embed.description = missingAuthor.join("\n");
      embed.footer = { text: `For ${author.tag}` };
      return message.member.send({ embeds: [embed] }).catch(() => {});
    }

    command.execute(message, args, client);
  }
}

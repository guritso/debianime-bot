import Permission from "../Utils/Permission.js";

export default class {
  constructor() {
    this.once = false;
  }
  async execute(message) {
    const { client, author, content, channel } = message;
    const { bot, messageCommands } = client;

    if (author.bot) return;

    if (!content.toLowerCase().startsWith(bot.prefix)) return;

    const args = content.trim().slice(bot.prefix.length).split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = messageCommands.get(commandName);

    console.log(commandName, command);
    if (!command) return;

    const { permissionsBot, permissionsUser } = command.data;

    const permission = new Permission()
      .setNeeded(permissionsBot)
      .setMemberId(client.user.id)
      .setChannel(channel);
    const missingClient = await permission.getMissing();

    let embed = {
      title: "Missing Permissions",
      color: client.color.int.red,
    };

    if (missingClient) {
      embed.description = missingClient.join("\n");
      embed.footer = { text: `For ${client.user.tag}` };
      return message.member.send({ embeds: [embed] });
    }

    permission.setMemberId(author.id).setNeeded(permissionsUser);
    const missingAuthor = await permission.getMissing();

    if (missingAuthor) {
      embed.description = missingAuthor.join("\n");
      embed.footer = { text: `For ${author.tag}` };
      return message.member.send({ embeds: [embed] });
    }

    try {
      command.execute(message, args, client);
    } catch (err) {
      console.log(err);
    }
  }
}

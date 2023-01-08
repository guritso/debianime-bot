export default class {
  constructor() {
    this.data = {
      name: "say",
      description: "say the given text",
      aliases: ["speak"],
      permissionsUser: ["ManageMessages"],
      permissionsBot: ["SendMessages", "ManageMessages"],
    };
  }
  async execute(message, args, client) {
    let { channel } = message;

    if (args[0].toLowerCase() == "channel") {
      args.shift();
      const giveChannel = args.shift();
      channel = message.guild.channels.cache.find(
        (ch) =>
          ch.name == giveChannel ||
          ch.id == giveChannel ||
          `<#${ch.id}>` == giveChannel
      );
    }
    await message.delete();

    if (!channel.viewable) {
      return message.member.send("I don't have acess to " + channel.name);
    }
    if (!channel.permissionsFor(client.user.id).has("SendMessages")) {
      return message.member.send("I can't send message to" + channel.name);
    }
    if (!args.length) {
      return message.member.send("Cannot send a empty message");
    }
    
    channel.send(args.join(" "));
  }
}

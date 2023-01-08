export default class {
  constructor() {
    this.data = {
      name: "say",
      description: "say the given text",
      aliases: ["speak"],
      permissionsBot: ["SendMessages", "ManageMessages"],
    };
  }
  async execute(message, args) {
    await message.delete();
    message.channel.send(args.join(" "));
  }
}

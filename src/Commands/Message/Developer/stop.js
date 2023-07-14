export default class {
  constructor() {
    this.data = {
      name: "stop",
      description: "turn of the bot",
      aliases: ["parar", "stop"],
      permissionsUser: ["Administrator"],
      permissionsBot: ["ViewChannel", "ManageMessages"],
    };
  }
  async execute(message, args, client) {
    await message.member.send(`${client.user.username} stoped`);
    await client.api.execute("PUT", "app/stop");
  }
}

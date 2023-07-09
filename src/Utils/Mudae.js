export default class Mudae {
  constructor() {}
  async react(message) {
    const { client, guildId, author } = message;
    const { mudae } = client.database.cache.get(guildId);

    if (!mudae) return;
    if (author.username !== "Mudae") return;
    if (!message.embeds.length) return;
    console.log(message);
    return await message.react("❤️");
  }
}

export default class Mudae {
  constructor() {}
  async react(message) {
    const { client, guildId, author } = message;
    const { mudae } = client.database.cache.get(guildId);

    if (
      !mudae ||
      author.username !== "Mudae" ||
      !message.embeds.length ||
      !message.components.length
    ) {
      return;
    }

    return await message.react("❤️");
  }
}

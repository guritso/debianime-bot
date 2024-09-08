export default class Mudae {
  async react(message) {
    const { client, guildId, author } = message;
    const { mudae } = client.database.cache.get(guildId);

    if (!mudae || !isMudaeRoll(message)) {
      return;
    }

    return await message.react("❤️");
  }
}

function isMudaeRoll(msg) {
  return msg.author.username === "Mudae" && msg.embeds.length && !msg.components.length;
}

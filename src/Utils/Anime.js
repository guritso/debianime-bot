export default class Anime {
  constructor(client) {
    this.client = client;
  }

  triggerAnimeOut(name, episode, image) {
    this.client.emit("animeOut", {
      client: this.client,
      anime: {
        name,
        episode,
        image,
      },
    });
  }
}

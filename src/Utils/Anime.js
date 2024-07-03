export default class Anime {
  constructor(client) {
    this.client = client;
  }

  triggerAnimeOut(name, episode, image) {
    this.client.emit("animeOut", { name, episode, image });
  }
}
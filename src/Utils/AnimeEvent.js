export default class AnimeEvent {
  constructor(client) {
    this.client = client;
  }

  triggerAnimeEpisodeOut(name, episode, image) {
    this.client.emit("animeEpisodeOut", {
      client: this.client,
      anime: {
        name,
        episode,
        image,
      },
    });
  }
}

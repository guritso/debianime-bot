export default class AnimeEvent {
  constructor(client) {
    this.client = client;
  }

  triggerAnimeEpisodeOut({ title, episode, link, image, pubDate }) {
    this.client.emit("animeEpisodeOut", {
      client: this.client,
      anime: {
        title,
        episode,
        link,
        image,
        pubDate,
      },
    });
  }
}

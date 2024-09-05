export default class AnimeEvent {
  constructor(client) {
    this.client = client;
  }
  /**
   * Trigger an anime episode out event
   * @param {Object} anime - The anime object containing details.
   * @param {string} anime.title - The title of the anime.
   * @param {string} anime.episode - The episode number.
   * @param {string} anime.link - The link to the episode.
   * @param {string} anime.image - The image URL of the anime.
   * @param {string} anime.pubDate - The publication date of the episode.
   */
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

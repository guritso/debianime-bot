import animeEvent from "../Utils/AnimeEvent.js";
import RSSParser from "rss-parser";

const parser = new RSSParser();

const setPresence = (client, title) => {
  client.presence.set({
    activities: [
      {
        name: title,
        type: 3,
      },
    ],
  });
};

export default class AnimeRss extends animeEvent {
  constructor(data) {
    super(data);
    (async () => {
      const oldEpisodes = await this.fetchFeed();
      this.oldEpisodes = new Map(
        oldEpisodes.map((episode) => [episode.title, episode])
      );
    })();
  }
  async execute() {
    console.log(`  • Fetched ${this.oldEpisodes.size} episodes`);
    // fetch each 1 minutes
    setInterval(async () => {
      const newEpisodes = await this.fetchFeed();
      for (const newEpisode of newEpisodes) {
        // 1 seconds and 300 milliseconds delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (!this.oldEpisodes.has(newEpisode.title)) {
          this.oldEpisodes.set(newEpisode.title, newEpisode);
          super.triggerAnimeEpisodeOut(newEpisode);
          setPresence(this.client, newEpisode.title);
        }
      }
    }, 1 * 60 * 1000);
  }
  async fetchFeed() {
    const FEED_URL = this.client.config.animeRss.url;

    try {
      const feed = await parser.parseURL(FEED_URL);
      const episodes = feed.items.map((item) => ({
        title: item.title,
        episode: item.title.split("#")[1],
        link: item.link,
        pubDate: item.pubDate.replace("+0000", "UTC"),
        image: item.enclosure.url.replace("small.jpg", "large.jpg"),
      }));
      return episodes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async refreshAnimes() {
    const animes = await this.fetchFeed();
    this.oldEpisodes = new Map(animes.map((anime) => [anime.title, anime]));
    return animes;
  }
}

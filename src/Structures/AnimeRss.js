import animeEvent from "../Utils/AnimeEvent.js";
import RSSParser from "rss-parser";

const parser = new RSSParser();
const FEED_URL = "https://www.livechart.me/feeds/episodes";

export default class AnimeRss extends animeEvent {
  constructor(data) {
    super(data);
    this.oldEpisodes = new Map();
  }
  async execute() {
    const oldEpisodes = await this.fetchFeed();
    this.oldEpisodes = new Map(oldEpisodes.map((episode) => [episode.title, episode]));
    console.log(`  • Fetched ${this.oldEpisodes.size} episodes`);
    // fetch each 1 minutes
    setInterval(async () => {
      const newEpisodes = await this.fetchFeed();
      for (const newEpisode of newEpisodes) {
        // 2 seconds delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!this.oldEpisodes.has(newEpisode.title)) {
          this.oldEpisodes.set(newEpisode.title, newEpisode);
          super.triggerAnimeEpisodeOut(newEpisode);
        }
      }
    }, 1 * 60 * 1000);
  }
  async fetchFeed() {
    try {
      const feed = await parser.parseURL(FEED_URL);
      const episodes = feed.items.map((item) => ({
        title: item.title,
        episode: item.title.split("#")[1],
        link: item.link,
        pubDate: item.pubDate,
        image: item.enclosure.url.replace("small.jpg", "large.jpg"),
      }));
      return episodes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

import AnimeEvent from "../Utils/AnimeEvent.js";

export default class AnimeApi {
  constructor(client) {
    this.client = client;
    this.url = "https://api.jikan.moe/v4/seasons/now";
    this.animeEvent = new AnimeEvent(client);
  }
  async execute() {
    let oldAnimes = this.client.database.cache.get("anime-season")?.data || [];
    const TIME_TO_CHECK = 600000; // 10min

    console.log(`  • Loaded ${oldAnimes.length} season animes`);
    setInterval(async () => {
      const animes = [];
      const season = await this.getSeasonAnimes();
      for (const anime of season) {
        // a delay of 0,7+ seconds to avoid rate limit
        await new Promise((resolve) => setTimeout(resolve, 700));
        const EP_COUNT = await this.checkEpisodes(anime);

        animes.push({
          id: anime.mal_id,
          name: anime.title,
          episodes: EP_COUNT,
          image: anime.images.webp.image_url,
        });

        const oldAnime = oldAnimes.find(
          (oldAnime) => oldAnime.id === anime.mal_id
        );

        if (oldAnime && oldAnime.episodes < EP_COUNT) {
          this.animeEvent.triggerAnimeEpisodeOut(
            anime.title,
            EP_COUNT,
            anime.images.webp.image_url
          );
        }
      }

      oldAnimes = animes;
      this.client.database.set("anime-season", { data: animes });
    }, TIME_TO_CHECK);
  }
  async checkEpisodes(anime) {
    const EP_LIST = await fetch(
      `https://api.jikan.moe/v4/anime/${anime.mal_id}/episodes`
    ).then((res) => res.json());
    if (EP_LIST && EP_LIST.data) {
      return EP_LIST.data.length;
    } else {
      return 0;
    }
  }
  async getSeasonAnimes() {
    const season = await fetch(this.url)
      .then((res) => res.json())
      .then((data) => data.data);
    return season;
  }
}

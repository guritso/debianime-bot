import Anime from "../Utils/Anime.js";

export default class AnimeApi {
  constructor(client) {
    this.url = "https://api.jikan.moe/v4/seasons/now";
    this.database = client.database;
    this.oldAnimesData = this.database.cache.get("animes") ?? [];
    this.anime = new Anime();
  }
  async execute() {
    const TIME_TO_CHECK = 1800000; // 30min
    const season = await fetch(this.url).then((res) => res.json());
    console.log(`  • Loaded ${season.data.length} season animes`);
    const animes = season.data.map((anime) => ({
      id: anime.mal_id,
      name: anime.title,
      episodes: anime.episodes ?? 0,
      image: anime.images.webp.image_url,
    }));

    setInterval(async () => {
      await this.checkAnimeOut(animes);
      this.database.set("animes", animes);
    }, TIME_TO_CHECK);
  }
  checkAnimeOut(animes) {
    animes.forEach((anime) => {
      this.oldAnimesData.forEach((oldAnime) => {
        if (anime.id === oldAnime.id) {
          if (anime.episodes > oldAnime.episodes) {
            this.anime.triggerAnimeOut(anime.name, anime.episodes, anime.image);
          }
        }
      });
    });
  }
}

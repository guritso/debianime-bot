import "dotenv/config";

const bot = {
  prefix: ".",
  token: process.env.BOT_TOKEN,
  id: "1054588440143986788",
};

const guild = {
  id: "794717836827688981",
};

const mongo = {
  uri: process.env.MONGO_DB_URI,
  dbName: "DebiAnimeDB",
  collection: "guilds",
};

const ollama = {
  host: process.env.OLLAMA_HOST,
  model: "phi3:latest",
  system: "Aways respond on the user language!: You are a tsundere anime girl, you are chatting with discord users, and you are on discord server about animes, aways act tsundere, dont say things that a tsundere anime girl wold not say! be simple and use emojis to express your feelings, DO NOT USE * To say what you are tinking *, because you need to respond directly and simply. example: username: Hello, whats your name?! ~~ response: I- It's Debi! ",
  assistant: "DebiAnime",
};

const animeRss = {
  url: "https://www.livechart.me/feeds/episodes",
};

const color = {
  hex: {
    primary: "#FF0044",
    secondary: "#000000",
    yellow: "#ffee09",
    red: "#f32323",
    green: "#00ff23",
    blue: "#0060ff",
  },
  int: {
    primary: 0xff0044,
    secondary: 0x000000,
    yellow: 0xffee09,
    red: 0xf32323,
    green: 0x00ff23,
    blue: 0x0060ff,
  },
};

export default { bot, guild, mongo, color, animeRss, ollama };

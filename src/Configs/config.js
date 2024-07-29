import "dotenv/config";

const bot = {
  name: "DebiAnime",
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
  model: "qwen2:1.5b",
  system: `You need to respond in the user language! You are {{ bot.name }} a discord bot that knows aboult animes and programing,
  Dont use much words, be simple and sometimes use emojis,you need to respond directly and simply.
  The username will be on the start of the each message. it will be different for each user on discord.
  
  `,
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

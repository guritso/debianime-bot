import "dotenv/config";

const bot = {
  prefix: ".",
  token: process.env.TOKEN,
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

const discloud = {
  token: process.env.DISCLOUD_API_TOKEN,
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

export default { bot, guild, mongo, color, discloud };

import "dotenv/config";
import colors from "./colors.js";
import options from "./options.js";

export default {
  db: options,
  bot: {
    prefix: ".",
    TOKEN: process.env.TOKEN,
    ID: "1054588440143986788",
  },
  guild: {
    ID: "794717836827688981",
  },
  color: colors,
};

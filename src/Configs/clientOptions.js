import { GatewayIntentBits } from "discord.js";

const debiAnimeOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  presence: {
    activities: [{ name: "Anime", type: 0 }],
    status: "online",
  },
};

export { debiAnimeOptions as clientOptions };

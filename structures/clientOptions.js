import { GatewayIntentBits } from "discord.js";

const debiAnimeOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  presence: {
    activities: [{ name: "building..", type: 0 }],
    status: "online",
  },
};

export { debiAnimeOptions as clientOptions };

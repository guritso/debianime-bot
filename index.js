import { Client, GatewayIntentBits } from "discord.js";
import { config } from "./config/config.js";
import { onReady } from "./events/ready.js";

const client = new Client({
	intents: [GatewayIntentBits.Guilds,
	          GatewayIntentBits.GuildMembers,
	          GatewayIntentBits.GuildMessages,
	          GatewayIntentBits.MessageContent],
  presence: {
  	activities: [{ name: "building..", type: 0 }],
  	status: "online"
  },	 
});

onReady(client);
client.login(config.bot.TOKEN)
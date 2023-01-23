export default (config) => {
  const { bot, guild, mongo } = config;
  
  const error = (args, data) => {
    console.log("ERROR: enter a valid", args);
    console.log("Received:", data);
    console.log(`${process.cwd()}/src/Configs/config.js`);
    process.exit();
  };

  if (!mongo.uri || typeof mongo.uri !== "string") {
    error("mongodb uri", mongo.uri);
  }
  if (!bot.id || isNaN(Number(bot.id))) {
    error("bot id.", bot.id);
  }
  if (!guild.id || isNaN(Number(guild.id))) {
    error("guild id.", guild.id);
  }
  if (!bot.token || typeof bot.token !== "string") {
    error("bot token.", bot.token);
  }
  if (!bot.prefix || typeof bot.prefix !== "string") {
    error("bot prefix", bot.prefix);
  }

  return config;
};

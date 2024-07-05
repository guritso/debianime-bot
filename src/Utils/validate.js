import os from 'os';

export default (config) => {
  const { bot, guild, mongo } = config;

  // Windows is not supported and I don't know why
  if (os.platform() === 'win32') {
    console.error("ERROR: Windows is not supported. only linux or mac");
    process.exit(1);
  }

  const ERROR_MESSAGES = {
    mongoUri: "mongodb uri",
    botId: "bot id",
    guildId: "guild id",
    botToken: "bot token",
    botPrefix: "bot prefix",
  };

  const error = (args, data) => {
    console.error(`ERROR: enter a valid ${args}`);
    console.error(`Received: ${data}`);
    console.error(`Config file path: ${process.cwd()}/src/Configs/config.js`);
    process.exit(1);
  };

  const validateString = (value, errorMessage) => {
    if (!value || typeof value !== "string") {
      error(errorMessage, value);
    }
  };

  const validateNumber = (value, errorMessage) => {
    if (!value || isNaN(Number(value))) {
      error(errorMessage, value);
    }
  };

  validateString(mongo.uri, ERROR_MESSAGES.mongoUri);
  validateNumber(bot.id, ERROR_MESSAGES.botId);
  validateNumber(guild.id, ERROR_MESSAGES.guildId);
  validateString(bot.token, ERROR_MESSAGES.botToken);
  validateString(bot.prefix, ERROR_MESSAGES.botPrefix);

  return config;
};

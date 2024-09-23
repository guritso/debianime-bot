# DebiAnime Bot

> An ES6 bot made initially for the DebiAnime Discord server, but now can handle different servers!

## Description

DebiAnime Bot is a versatile Discord bot developed in ES6, designed to enhance the user experience in anime-related servers. It offers a variety of features including a leveling system, anime episode notifications, moderation, etc.

## Key Features

- User activity-based leveling system
- New anime episode notifications
- Customizable per-server settings

## Technologies Used

- Node.js
- Discord.js v14
- MongoDB (via @keyv/mongo)
- LiveChart RSS for anime updates

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/guritso/debianime-bot.git
   ```

2. Install dependencies:
   ```
   yarn install
   # or
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```
   BOT_TOKEN=your_discord_token
   MONGO_DB_URI=your_mongodb_uri
   ```

4. Start the bot:
   ```
   yarn start
   # or
   npm run start
   ```

## Configuration

Use the `/config` command to set up specific channels for:

- Welcome messages
- User ranking
- Anime notifications

## License

MIT License - [LICENSE](LICENSE)

## Author

GuriZenit

## Links

- [GitHub Repository](https://github.com/guritso/debianime-bot)
- [Report Issues](https://github.com/guritso/debianime-bot/issues)

import Keyv from "@keyv/mongo";

export default class Database extends Keyv {
  constructor({ config }) {
    super(config.mongo);
    this.cache = new Map();
    this.body = {
      prefix: config.bot.prefix,
      mudae: false,
      channels: {},
      members: [],
    };
  }

  async execute() {
    for await (const [key, value] of this.iterator()) {
      this.cache.set(key, value);
    }

    console.log(`  • loaded data of ${this.cache.size - 1} guilds!`);

    return this;
  }

  async set(key, value) {
    const data = { ...this.body, ...this.cache.get(key) };

    await Object.assign(data, value);
    this.cache.set(key, data);
    await super.set(key, data);
  }

  async ensure(key) {
    if (!this.cache.has(key)) {
      await this.set(key);
    }
  }
}

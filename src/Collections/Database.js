import Keyv from "@keyv/mongo";

export default class Database extends Keyv {
  constructor({ db: options }) {
    super(options);
    this.cache = new Map();
    this.body = {
      prefix: ".",
      members: [],
    };
  }
  async execute() {
    for await (const [key, value] of this.iterator()) {
      this.cache.set(key, value);
    }

    console.log(`  • loaded data of ${this.cache.size} guilds!`);

    return this;
  }
  async set(key, value) {
    const data = { ...this.body, ...this.cache.get(key) };

    await Object.assign(data, value);
    await this.cache.set(key, data);
    await super.set(key, data);
  }
}

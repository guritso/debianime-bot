import Client from "@replit/database";
import "dotenv/config";

export default class Database extends Client {
  constructor() {
    super(process.env.REPLIT_DB_URL);
    this.cache = new Map();
    this.body = {
      prefix: ".",
      levels: {},
    };
  }
  async execute() {
    const data = await super.list();

    for (let key of data) {
      const value = await super.get(key);
      this.cache.set(key, value);
      console.log("  •", key);
    }

    return this;
  }
  async set(key, value) {
    const data = this.cache.get(key) || this.body;
    const join = { ...data, ...value };

    await super.set(key, join);
    this.cache.set(key, join);
  }
}

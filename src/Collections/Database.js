import Client from "@replit/database";
import "dotenv/config";

export default class Database extends Client {
  constructor(client) {
    super(process.env.REPLIT_DB_URL);
    this.client = client;
    this.cache = new Map();
  }
  async execute() {
    const data = await super.list();

    for (let key of data) {
      const value = await super.get(key);
      this.cache.set(key, value);
    }
    console.log(this.cache)
  }
}

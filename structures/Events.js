import { readdirSync } from "fs";

export default class Events {
  constructor(client) {
    this.client = client;
  }
  async load() {
    const eventFile = readdirSync("events");
    const client = this.client;
    
    eventFile.forEach(async (file) => {
      const eventName = file.replace(".js", "");
      const event = new (await import(`../events/${file}`)).default(client);

      client.on(eventName, (...args) => {
        event.execute(...args);
      });
    });
  }
}

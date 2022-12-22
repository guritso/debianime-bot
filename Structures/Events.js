import { readdirSync } from "fs";

export default class Events {
  constructor(client) {
    this.client = client;
  }
  async execute(logs) {
    logs.start(Events.name);
    const eventFile = readdirSync("Events");
    const client = this.client;

    eventFile.forEach(async (file) => {
      const eventName = file.replace(".js", "");
      const event = new (await import(`../Events/${file}`)).default(client);

      client.on(eventName, (...args) => {
        event.execute(...args);
      });
    });
    logs.end();
  }
}

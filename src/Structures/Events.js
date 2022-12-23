import { readdirSync } from "node:fs";

export default class Events {
  constructor(client) {
    this.client = client;
  }
  async execute() {
    const PATH = process.cwd() + "/src/Events";
    const eventFile = readdirSync(PATH);
    const client = this.client;

    eventFile.forEach(async (file) => {
      const eventName = file.replace(".js", "");
      const Event = await import(`${PATH}/${file}`);
      const event = new Event.default(client);

      client.on(eventName, (...args) => {
        event.execute(...args);
      });
    });
  }
}

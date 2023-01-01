import { readdirSync } from "node:fs";

export default class Events {
  constructor(client) {
    this.client = client;
  }
  async execute() {
    const PATH = process.cwd() + "/src/Events";
    const eventFiles = readdirSync(PATH);
    const client = this.client;

    await new Promise((resolve) => {
      eventFiles.forEach(async (file, index) => {
        const eventName = file.replace(".js", "");
        const Event = await import(`${PATH}/${file}`);
        const event = new Event.default();

        if (event.once) {
          client.once(eventName, (...args) => {
            event.execute(...args);
          });
        } else {
          client.on(eventName, (...args) => {
            event.execute(...args);
          });
        }

        console.log(` • ${eventName}`);
        if (eventFiles.length == index + 1) resolve();
      });
    });
  }
}

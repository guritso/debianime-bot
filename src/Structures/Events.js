import { readdirSync } from "node:fs";

export default class Events {
  constructor(client) {
    this.client = client;
  }
  async execute() {
    const PATH = process.cwd() + "/src/Events";
    const eventFiles = readdirSync(PATH);
    const client = this.client;

    let count = 0;

    await new Promise((resolve) => {
      eventFiles.forEach(async (file) => {
        const eventName = file.replace(".js", "");
        const Event = await import(`${PATH}/${file}`);
        const event = new Event.default(client);

        client.on(eventName, (...args) => {
          event.execute(...args);
        });

        console.log(` • ${eventName}`);
        count = count + 1;
        if (eventFiles.length == count) resolve();
      });
    });
  }
}

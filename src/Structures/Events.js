import { readdirSync } from "node:fs";

export default class Events {
  constructor(client) {
    this.client = client;
  }
  async execute() {
    const PATH = process.cwd() + "/src/Events";
    const files = readdirSync(PATH);
    const client = this.client;

    return new Promise(async (resolve) => {
      for (let file of files) {
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

        console.log(`  • ${eventName}`);
        if (files.indexOf(file) == files.length - 1) {
          resolve();
        }
      }
    });
  }
}

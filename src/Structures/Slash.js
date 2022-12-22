import { readdirSync } from "node:fs";

export default class Slash {
  constructor(client) {
    this.commands = client.commands;
  }
  async execute(logs) {
    logs.start(Slash.name);
    const folders = readdirSync("src/Commands");

    folders.forEach((dir) => {
      const commands = readdirSync(`src/Commands/${dir}`)
        .filter((name) => name.endsWith(".js"))
        .forEach(async (cmd) => {
          const Load = await import(`../Commands/${dir}/${cmd}`);
          const slash = new Load.default();

          this.commands.set(slash.data.name, slash);
        });
    });
    
      logs.end()
  }
}

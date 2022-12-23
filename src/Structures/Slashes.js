import { readdirSync } from "node:fs";

export default class Slashes {
  constructor(client) {
    this.commands = client.commands;
  }
  async execute(logs) {
    logs.init(Slashes.name);

    const PATH = process.cwd() + "/src/Commands";
    const folders = readdirSync(PATH);

    await new Promise((resolve) => {
      folders.forEach((dir) => {
        const commandFiles = readdirSync(`${PATH}/${dir}`).filter((nome) =>
          nome.endsWith(".js")
        );

        commandFiles.forEach(async (cmd) => {
          const Slash = await import(`${PATH}/${dir}/${cmd}`);
          const slash = new Slash.default();

          this.commands.set(slash.data.name, slash);
          if (this.commands.size == commandFiles.length) {
            resolve();
          }
        });
      });
    });
    await logs.end();
  }
}

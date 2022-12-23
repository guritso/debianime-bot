import { readdirSync } from "node:fs";

export default class Slashes {
  constructor(client) {
    this.commands = client.commands;
  }
  async execute() {
    const PATH = process.cwd() + "/src/Commands/Slash";
    const folders = readdirSync(PATH);
    // wait to save the commands in
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
  }
}

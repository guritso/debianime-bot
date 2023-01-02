import { readdirSync } from "node:fs";

export default class Enmap {
  constructor(path) {
    this.PATH = process.cwd() + path;
    this.folders = readdirSync(this.PATH);
  }
  async execute(map) {
    await new Promise((resolve) => {
      const PATH = this.PATH;

      this.folders.forEach((dir) => {
        const files = readdirSync(`${PATH}/${dir}`).filter((name) =>
          name.endsWith(".js")
        );

        files.forEach(async (cmd, index) => {
          const Load = await import(`${PATH}/${dir}/${cmd}`);
          const load = await new Load.default();

          map.set(load.data.name, load);
          console.log(` • ${load.data.name}`);

          if (files.length == index + 1) resolve();
        });
      });
    });
  }
}

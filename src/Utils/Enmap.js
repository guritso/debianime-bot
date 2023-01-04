import { readdirSync } from "node:fs";

export default class Enmap {
  constructor(path) {
    this.PATH = path;
    this.folders = readdirSync(this.PATH);
  }
  async execute(map) {
    return new Promise((resolve) => {
      const PATH = this.PATH;

      this.folders.forEach(async (dir, index) => {
        const files = readdirSync(`${PATH}/${dir}`).filter((name) =>
          name.endsWith(".js")
        );

        for (let cmd of files) {
          const Load = await import(`${PATH}/${dir}/${cmd}`);
          const load = await new Load.default();

          map.set(load.data.name, load);
          console.log(`  • ${load.data.name}`);
        }
        if (this.folders.length == index + 1) resolve();
      });
    });
  }
}

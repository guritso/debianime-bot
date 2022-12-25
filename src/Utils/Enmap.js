import { readdirSync } from "node:fs";

export default class Enmap {
  constructor(path) {
    this.PATH = process.cwd() + path;
    this.folders = readdirSync(this.PATH);
    this.count = 0;
  }
  async execute (map) {
    await new Promise((resolve) => {
      const PATH = this.PATH;

      this.folders.forEach((dir) => {
        this.files = readdirSync(`${PATH}/${dir}`).filter((name) =>
          name.endsWith(".js")
        );

        this.files.forEach(async (cmd) => {
          const Load = await import(`${PATH}/${dir}/${cmd}`);
          const load = await new Load.default();

          map.set(load.data.name, load);

          this.count = this.count + 1;
          if (this.count == this.files.length) {
            resolve();
          }
        });
      });
    });
  }
}

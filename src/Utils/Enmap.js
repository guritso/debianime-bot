import { readdirSync } from "node:fs";

export default class Enmap {
  /**
   * Create a new Enmap instance
   * @param {string} path - The path to the folder containing the files.
   */
  constructor(path) {
    this.PATH = path;
    this.folders = readdirSync(this.PATH);
  }
  /**
   * Load the files into the enmap instance.
   * @param {Enmap} map - The enmap instance to load the files into.
   */
  async execute(map) {
    const PATH = this.PATH;

    const folderPromises = this.folders.map(async (dir) => {
      const files = readdirSync(`${PATH}/${dir}`).filter((name) =>
        name.endsWith(".js")
      );

      const filePromises = files.map(async (cmd) => {
        const Load = await import(`${PATH}/${dir}/${cmd}`);
        const load = await new Load.default();

        map.set(load.data.name, load);
        console.log(`  • ${load.data.name}`);
      });

      await Promise.all(filePromises);
    });

    await Promise.all(folderPromises);
  }
}

import { readdirSync } from "node:fs";
import Enmap from "../Utils/Enmap.js";

export default class Actions {
  constructor(client) {
    this.interCommands = client.interactionCommands;
    this.messageCommands = client.messageCommands;
  }

  async execute() {
    const PATH = process.cwd() + "/src/Commands";
    const folders = readdirSync(PATH);

    const promises = folders.map(async (name) => {
      const enmap = new Enmap(`${PATH}/${name}`);

      if (name === "Message") {
        await enmap.execute(this.messageCommands);
      } else {
        await enmap.execute(this.interCommands);
      }
    });

    await Promise.all(promises);
  }
}

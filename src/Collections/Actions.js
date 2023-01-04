import { readdirSync } from "node:fs";
import Enmap from "../Utils/Enmap.js";

export default class Actions {
  constructor(client) {
    this.interCommands = client.interactionCommands;
    this.messageCommands = client.messageCommands;
  }
  execute() {
    const PATH = process.cwd() + "/src/Commands";
    const folders = readdirSync(PATH);

    return new Promise(async (resolve) => {
      for (let name of folders) {
        const enmap = new Enmap(`${PATH}/${name}`);

        if (name == "Message") {
          await enmap.execute(this.messageCommands);
        } else {
          await enmap.execute(this.interCommands);
        }

        if (folders.indexOf(name) == folders.length - 1) {
          resolve();
        }
      }
    });
  }
}

import Enmap from "../Utils/Enmap.js";

export default class Interactions {
  constructor(client) {
    this.interCommands = client.interactionCommands;
  }
  async execute() {
    const PATH = "/src/Commands/";

    const slash = new Enmap(PATH + "Slash");
    const apps = new Enmap(PATH + "Apps");

    await slash.execute(this.interCommands);
    await apps.execute(this.interCommands);
  }
}

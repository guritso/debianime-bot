import Enmap from "../Utils/Enmap.js";

export default class Messages {
  constructor(client) {
    this.messageCommands = client.messageCommands;
  }
  async execute() {
    const PATH = "/src/Commands/Message";

    const message = new Enmap(PATH);
    await message.execute(this.messageCommands);
  }
}

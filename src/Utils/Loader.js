import Interactions from "../Collections/Interactions.js";
import Messages from "../Collections/Messages.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";

export default class {
  constructor(client) {
    this.inter = new Interactions(client);
    this.commands = new Messages(client);
    this.handler = new Handler(client);
    this.events = new Events(client);

    this.print = (...args) => {
      console.log(...args);
    };
  }
  async execute() {
    this.print("↺ loading Interactions...|1/5|");
    await this.inter.execute();
    this.print("↺ loading Commands.......|2/5|");
    await this.commands.execute();
    this.print("↺ loading Handler........|3/5|");
    await this.handler.execute();
    this.print("↺ loading Events.........|4/5|");
    await this.events.execute();
    this.print("↺ loading Client.........|5/5|");
  }
}

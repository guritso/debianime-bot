import Actions from "../Collections/Actions.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";

export default class {
  constructor(client) {
    this.actions = new Actions(client);
    this.handler = new Handler(client);
    this.events = new Events(client);

    this.print = (...args) => {
      console.log(...args);
    };
  }
  async execute() {
    this.print("↺ loading Actions........|1/4|");
    await this.actions.execute();
    this.print("↺ loading Handler........|2/4|");
    await this.handler.execute();
    this.print("↺ loading Events.........|3/4|");
    await this.events.execute();
    this.print("↺ loading Client.........|4/4|");
  }
}

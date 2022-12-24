import Interactions from "../Collections/Interactions.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";

export default class {
  constructor(client) {
    this.inter = new Interactions(client);
    this.handler = new Handler(client);
    this.events = new Events(client);

    this.print = (msg) => {
      console.log(msg);
    };
  }
  async execute() {
    this.print("↺ loading Interactions...|1/4|");
    await this.inter.execute();
    this.print("↺ loading Handler........|2/4|");
    await this.handler.execute();
    this.print("↺ loading Events.........|3/4|");
    await this.events.execute();
    this.print("◐ Starting Client........|4/4|");
  }
}

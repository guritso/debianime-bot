import Database from "../Collections/Database.js";
import Actions from "../Collections/Actions.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";

export default class {
  constructor(client) {
    this.database = new Database(client);
    this.actions = new Actions(client);
    this.handler = new Handler(client);
    this.events = new Events(client);

    this.print = (...args) => {
      console.log(...args);
    };
  }
  async execute() {
    this.print("↺ loading Database.......|1/5|");
    await this.database.execute();
    this.print("↺ loading Actions........|2/5|");
    await this.actions.execute();
    this.print("↺ loading Handler........|3/5|");
    await this.handler.execute();
    this.print("↺ loading Events.........|4/5|");
    await this.events.execute();
    this.print("↺ loading Client.........|5/5|");
  }
}

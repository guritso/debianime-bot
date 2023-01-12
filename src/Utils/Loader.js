import Database from "../Collections/Database.js";
import Actions from "../Collections/Actions.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";

export default class {
  constructor(client) {
    this.actions = new Actions(client);
    this.handler = new Handler(client);
    this.events = new Events(client);
    this.database = new Database();

    client.database = this.database;
  }
  async execute() {
    console.log("↺ loading Database.......|1/5|");
    await this.database.execute();
    console.log("↺ loading Actions........|2/5|");
    await this.actions.execute();
    console.log("↺ loading Handler........|3/5|");
    await this.handler.execute();
    console.log("↺ loading Events.........|4/5|");
    await this.events.execute();
    console.log("↺ loading Client.........|5/5|");
  }
}

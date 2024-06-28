import Database from "../Collections/Database.js";
import Actions from "../Collections/Actions.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";

export default class Loader {
  constructor(client) {
    this.database = new Database(client);
    this.actions = new Actions(client);
    this.handler = new Handler(client);
    this.events = new Events(client);

    client.database = this.database;
  }

  async execute() {
    const tasks = [
      { name: "Database", instance: this.database },
      { name: "Actions", instance: this.actions },
      { name: "Handler", instance: this.handler },
      { name: "Events", instance: this.events },
    ];

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      console.log(`↺ loading ${task.name}.......|${i + 1}/5|`);
      try {
        await task.instance.execute();
      } catch (error) {
        console.error(`Error loading ${task.name}:`, error);
        return;
      }
    }
    console.log("↺ loading Client.........|5/5|");
  }
}

import Database from "../Collections/Database.js";
import Actions from "../Collections/Actions.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";
import AnimeRss from "../Structures/AnimeRss.js";

export default class Loader {
  constructor(client) {
    this.database = new Database(client);

    client.database = this.database;

    this.actions = new Actions(client);
    this.handler = new Handler(client);
    this.events = new Events(client);
    this.animeRss = new AnimeRss(client);
  }

  async execute() {
    const tasks = [
      { name: "Database", instance: this.database },
      { name: "Actions", instance: this.actions },
      { name: "Handler", instance: this.handler },
      { name: "Events", instance: this.events },
      { name: "AnimeRss", instance: this.animeRss },
    ];

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      console.log(`↺ loading ${task.name}.......|${i + 1}/6|`);
      try {
        await task.instance.execute();
      } catch (error) {
        console.error(`Error loading ${task.name}:`, error);
        return;
      }
    }
    console.log("↺ loading Client.........|6/6|");
  }
}

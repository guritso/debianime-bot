import Database from "../Collections/Database.js";
import Actions from "../Collections/Actions.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";
import AnimeRss from "../Structures/AnimeRss.js";

const CLASS_NAMES = ["Database", "Actions", "Handler", "Events", "AnimeRss"];

export default class Loader {
  constructor(client) {
    this.database = new Database(client);
    this.actions = new Actions(client);
    this.handler = new Handler(client);
    this.events = new Events(client);
    this.animerss = new AnimeRss(client);

    client.database = this.database;
    client.loader = this;
  }

  async execute() {
    const tasks = CLASS_NAMES.map((name) => ({ name, instance: this[name.toLowerCase()] }));

    for (const [index, task] of tasks.entries()) {
      console.log(
        `↺ loading ${task.name}.......|${index + 1}/${tasks.length}|`
      );
      try {
        await task.instance.execute();
      } catch (error) {
        console.error(`Error loading ${task.name}:`, error);
        return;
      }
    }
    console.log(`↺ loading Client.........|${tasks.length}/${tasks.length}|`);
  }
}

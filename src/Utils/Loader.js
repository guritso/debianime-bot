import Database from "../Collections/Database.js";
import Actions from "../Collections/Actions.js";
import Handler from "../Structures/Handler.js";
import Events from "../Structures/Events.js";
import AnimeRss from "../Structures/AnimeRss.js";
import OllamaAI from "../Structures/OllamaAI.js";

const CLASS_NAMES = ["Database", "Actions", "Handler", "Events", "AnimeRss", "OllamaAI"];

export default class Loader {
  constructor(client) {
    this.database = new Database(client);
    this.actions = new Actions(client);
    this.handler = new Handler(client);
    this.events = new Events(client);
    this.animerss = new AnimeRss(client);
    this.ollamaai = new OllamaAI(client);

    client.ollamaai = this.ollamaai;
    client.database = this.database;
    client.loader = this;
  }

  async execute() {
    const tasks = CLASS_NAMES.map((name) => ({
      name,
      instance: this[name.toLowerCase()],
    }));

    const tasksLength = tasks.length + 1;

    for (const [index, task] of tasks.entries()) {
      console.log(`↺ loading ${task.name}.......|${index + 1}/${tasksLength}|`);
      try {
        await task.instance.execute();
      } catch (error) {
        console.error(`Error loading ${task.name}:`, error);
        return;
      }
    }
    console.log(`↺ loading Client.........|${tasksLength}/${tasksLength}|`);
  }
}

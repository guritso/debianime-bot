import { EventEmitter } from "node:events";

export default class Anime extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
  }

  triggerAnimeOut(name, episode, image) {
    this.emit("animeOut", { name, episode, image });
  }
}
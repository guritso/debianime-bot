import { readdirSync } from "node:fs";

export default class Logs {
  constructor() {
    this.print = (txt, inline) => {
      if (inline) {
        process.stdin.write(txt);
      } else {
        console.log(txt);
      }
    };
    this.files = readdirSync("src/Structures");
    this.check = new Map();
  }
  execute() {
    for (let iten of this.files) {
      iten = iten.split(".")[0];
      this.check.set(iten, false);
    }
  }
  async init(name) {
    this.name = name;
    this.print(`↺ loading ${name}`, true);
    let stop = 0;
    await new Promise(() => {
      const wait = setInterval(() => {
        if (this.check.get(name) == true) {
          this.print(` ✓ done.`);
          clearInterval(wait);
        }
        stop++;
        if (stop == 3000) {
          clearInterval(wait);
          this.print(" ✘ error.");
        }
      });
    });
  }
  async end() {
    this.check.set(this.name, true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

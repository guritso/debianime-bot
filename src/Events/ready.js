export default class {
  constructor() {
    this.once = true;
  }
  async execute(client) {
    console.log(` • ${client.user.tag} online!`);
  }
}

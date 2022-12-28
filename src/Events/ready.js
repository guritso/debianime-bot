export default class {
  constructor(client) {
    this.client = client;
  }
  async execute() {
    console.log(` • ${this.client.user.tag} online!`);
  }
}

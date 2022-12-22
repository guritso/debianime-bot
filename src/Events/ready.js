export default class {
  constructor(client) {
    this.client = client;
  }
  async execute() {
    console.log(`\n${this.client.user.tag} online ●`);
  }
}

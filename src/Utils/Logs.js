export default class Logs {
  constructor() {
    this.name = null;
    this.send = true;
  }
  start(name) {
    this.name = name;
    verify(this.send);

    if (!this.name) return;

    process.stdin.write(`↺loading ${name}`);
    this.send = false;

    function error() {
      console.log(` ✗ error.`);
    }

    function verify(send) {
      if (!send) {
        error();
      }
    }
  }
  end() {
    console.log(` ✓ done.`);
    this.send = true;
  }
}

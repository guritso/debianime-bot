export default class Permission {
  constructor() {
    this.data = {
      channel: null,
      need: null,
      have: null,
      id: null,
    };
    this.missing = [];
  }
  async check() {
    const { channel, need, id } = this.data;

    if (!channel || !need || !id) return;

    this.have = channel.permissionsFor(id);

    need.forEach((permission) => {
      if (!this.have.has(permission)) {
        this.missing.push(permission);
      }
    });

    if (this.missing.length) {
      return this.missing;
    } else {
      return false;
    }
  }
  setNeed(need) {
    this.data.need = need;
    return this;
  }
  setChannel(channel) {
    this.data.channel = channel;
    return this;
  }
  setId(id) {
    this.data.id = id;
    return this;
  }
}

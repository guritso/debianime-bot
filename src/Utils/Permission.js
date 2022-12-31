export default class Permission {
  constructor() {
    this.memberId = null;
    this.channel = null;
    this.needed = null;
    this.missing = null;
  }
  async getMissing() {
    const { memberId, channel, needed } = this;
    const permissions = channel.permissionsFor(memberId);

    needed.forEach((name) => {
      if (!permissions.has(name)) {
        if (!this.missing) this.missing = [];
        this.missing.push(name);
      }
    });

    return this.missing;
  }
  setMemberId(newMemberId) {
    this.memberId = newMemberId;
    return this;
  }
  setNeeded(newNeeded) {
    this.needed = newNeeded;
    return this;
  }
  setChannel(newChannel) {
    this.channel = newChannel;
    return this;
  }
}

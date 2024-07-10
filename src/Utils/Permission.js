export default class Permission {
  constructor() {
    this.memberId = null;
    this.channel = null;
    this.needed = null;
    this.missing = null;
  }

  async getMissing() {
    const { memberId, channel, needed } = this;
    if (!memberId || !channel || !needed) return;

    const permissions = channel.permissionsFor(memberId);
    this.missing = needed.filter(name => !permissions.has(name));

    return this.missing.length ? this.missing : false;
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

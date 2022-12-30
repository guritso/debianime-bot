export default class Permission {
  constructor() {
    this.data = {
      memberID: null,
      channel: null,
      needed: null,
    };
  }
  async check() {
    const { channel, needed, memberId } = this.data;
    if (!channel || !needed || !memberId) return;
    const permissions = channel.permissionsFor(memberId);
    const missingPermissions = [];

    needed.forEach((name) => {
      if (!permissions.has(name)) {
        missingPermissions.push(name);
      }
    });
    return missingPermissions;
  }
  setMemberId(newMemberId) {
    this.data.memberId = newMemberId;
    return this;
  }
  setNeeded(newNeeded) {
    this.data.needed = newNeeded;
    return this;
  }
  setChannel(channel) {
    this.data.channel = channel;
    return this;
  }
}

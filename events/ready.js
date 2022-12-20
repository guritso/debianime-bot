export const ready = (client) => {
  client.on("ready", () => {
    console.log(`${client.user.tag} online!`);
  });
}
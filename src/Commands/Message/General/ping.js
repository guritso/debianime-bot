export default class {
    constructor() {
        this.data = {
            name: "ping",
            description: "Show api ping and bot ping.",
            aliases: ["ms"],
            permissionsBot: ["EmbedLinks", "SendMessages"],
        }
    }
    async execute (message, args, client) {
        const bot = Date.now() - message.createdTimestamp;
        const api = Math.round(client.ws.ping);
    
        const embed = {
          title: "PING",
          fields: [
            { name: "BOT:", value: `${bot}ms`, inline: true },
            { name: "API:", value: `${api}ms`, inline: true },
          ],
          color: client.config.color.int.primary,
        };
    
        message.reply({
          embeds: [embed],
          ephemeral: true,
        });
    }
}
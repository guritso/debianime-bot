export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "levels",
      description: "Show raking of user levels",
    };
  }
  execute(interaction) {
    const { client, guild, user } = interaction;
    const { database } = client;

    if (!database.cache.get(guild.id)) {
      return interaction.reply("> There's no raking!");
    }

    const levels = database.cache.get(guild.id).levels;
    const ranking = [];
    const author = {};

    levels.sort((a, b) => b.level - a.level);
    
    levels.forEach((member, index) => {
      if (index + 1 >= 10) return;
      if (member.level == 0) return;

      ranking.push(`#${index + 1} • ${member.tag} • LVL: **${member.level}**`);

      if (user.id == member.id) {
        author.level = member.level;
        author.position = index + 1;
      }
    });

    const embed = {
      title: `Levels on ${guild.name}`,
      description: ranking.join("\n"),
      color: client.color.int.primary,
      footer: {
        text: `#${author.position} • ${user.tag} • LVL: ${author.level}`,
        icon_url: user.avatarURL(),
      },
    };

    interaction.reply({ embeds: [embed] });
  }
}

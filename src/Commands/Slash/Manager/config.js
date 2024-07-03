export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "config",
      description: "See the guild's configs",
      dm_permission: false,
      default_member_permissions: 1 << 5, // ManageGuild
      options: [
        {
          name: "set",
          description: "Change the configs",
          required: false,
          type: 3,
          choices: [
            { name: "Welcome channel", value: "welcome" },
            { name: "Ranking channel", value: "ranking" },
            { name: "Logs channel", value: "logs" },
            { name: "Anime channel", value: "anime" },
          ],
        },
      ],
    };
  }
  async execute(interaction) {
    const { client, guild } = interaction;
    const { database, config } = client;
    const { prefix, channels } = database.cache.get(guild.id);
    const string = interaction.options.getString("set");

    if (string) {
      const selectMenu = {
        type: 1,
        components: [
          {
            type: 8,
            custom_id: "selected_ch",
            placeholder: "Select a channel",
            channel_types: [0],
          },
        ],
      };

      const resolve = await interaction.reply({
        content: `Set ${string} channel`,
        ephemeral: true,
        components: [selectMenu],
      });

      try {
        const selected = await resolve.awaitMessageComponent({ time: 30000 });

        channels[string] = selected.values.pop();
        database.set(guild.id, { channels });

        return await selected.update({
          content: `${string} channel changed!`,
          components: [],
        });
      } catch (e) {
        return;
      }
    }

    const { welcome, ranking, logs, anime } = channels;

    const embed = {
      author: {
        name: interaction.guild.name + "' configs",
        icon_url: interaction.guild.iconURL(),
      },
      color: config.color.int.primary,
      fields: [
        { name: "Prefix", value: prefix },
        { name: "Welcome channel", value: getChName(welcome) },
        { name: "Ranking channel", value: getChName(ranking) },
        { name: "Logs channel", value: getChName(logs) },
        { name: "Anime channel", value: getChName(anime) },
      ],
    };

    interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });

    function getChName(id) {
      let channel = guild.channels.cache.get(id);

      if (!channel) {
        return "`undefined`";
      } else {
        return channel.name;
      }
    }
  }
}

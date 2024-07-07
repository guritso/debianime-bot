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
          name: "welcome_channel",
          description: "Set the welcome channel",
          required: false,
          type: 7, // Channel type
        },
        {
          name: "ranking_channel",
          description: "Set the ranking channel",
          required: false,
          type: 7, // Channel type
        },
        {
          name: "logs_channel",
          description: "Set the logs channel",
          required: false,
          type: 7, // Channel type
        },
        {
          name: "anime_channel",
          description: "Set the anime channel",
          required: false,
          type: 7, // Channel type
        },
      ],
    };
  }

  async execute(interaction) {
    const { client, guild } = interaction;
    const { database } = client;
    const { channels, prefix } = database.cache.get(guild.id);
    const MODIFIED_CHANNELS = [];

    for (const option of this.data.options) {
      const channel = interaction.options.getChannel(option.name);
      if (channel) {
        MODIFIED_CHANNELS.push(option.name);
        channels[option.name] = channel.id;
      }
    }

    if (MODIFIED_CHANNELS.length) {
      database.set(guild.id, { channels });
      return interaction.reply({
        ephemeral: true,
        content: `Channels updated: ${MODIFIED_CHANNELS.join(", ")}`,
      });
    }

    const FIELDS = [{ name: "Prefix", value: "```" + prefix + "```" }];

    for (const channel of this.data.options) {
      FIELDS.push({ name: channel.name, inline: true, value: getChannelName(channels[channel.name]) });
    }

    const embed = {
      author: {
        name: guild.name + "'s config",
        icon_url: guild.iconURL(),
      },
      color: client.config.color.int.primary,
      fields: FIELDS,
    };

    return interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });

    function getChannelName(id) {
      let channel = guild.channels.cache.get(id);

      if (!channel) {
        return "```N/A```";
      } else {
        return "```" + channel.name + "```";
      }
    }
  }
}

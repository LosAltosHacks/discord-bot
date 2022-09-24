const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { attendeeRole } = require('../config.json');

const rulesEmbed = new EmbedBuilder()
  .setColor([2, 62, 138])
  .setTitle('Rules')
  .setAuthor({
    name: 'Los Altos Hacks Team',
    iconURL:
      'https://raw.githubusercontent.com/LosAltosHacks/los-altos-hacks/master/frontpage/favicon-new.png',
  })
  .addFields(
    {
      name: 'General Rules',
      value:
        '\n\n• No spamming, this includes mention spamming, even as a joke\n• No advertising, regardless of if it is related to hackathons\n• No NSFW content\n• Use appropriate channels\n• Do not abuse `/staff`\n• Follow Discord TOS',
    },
    {
      name: 'Hackathon Rules',
      value:
        "\n\n• No using source code that isn't open source\n• MLH Code of Conduct: https://static.mlh.io/docs/mlh-code-of-conduct.pdf\n• Only **brainstorming** sessions and design concepts are allowed before September 24 - no actual writing of code",
    },
  );

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Hackathon and Server Rules')
    .setDefaultMemberPermissions(0),
  async execute(client, interaction) {
    await interaction.deferReply();
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [rulesEmbed], ephemeral: false });
  },
  permittedRoles: [attendeeRole],
};

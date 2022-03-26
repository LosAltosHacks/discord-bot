const { SlashCommandBuilder } = require('@discordjs/builders');
const { generateEmbed } = require('../tools.js');

const aboutEmbed = generateEmbed(
  'About LAHacksBot',
  "Hi there! I am the **Los Altos Hacks Bot** and I'm a Discord bot made specifically for the Los Altos Hacks Discord. I'm also open-source! You can view my code at <https://github.com/LosAltosHacks/discord-bot>. You can view all of my commands by typing `/` into the message box.",
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('About LAHacksBot!'),
  async execute(client, interaction) {
    await interaction.reply({ embeds: [aboutEmbed], ephemeral: true });
  },
};

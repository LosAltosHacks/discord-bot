const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { generateEmbed } = require('../tools.js');

const aboutEmbed = generateEmbed(
  'Website',
  'Check out our website for information!',
);

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setLabel('Website')
    .setStyle('Link')
    .setURL('https://www.losaltoshacks.com'),
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('website')
    .setDescription('Get a link to our website!'),
  async execute(client, interaction) {
    await interaction.reply({
      embeds: [aboutEmbed],
      components: [row],
      ephemeral: true,
    });
  },
};

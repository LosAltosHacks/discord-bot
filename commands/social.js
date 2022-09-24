const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { generateEmbed } = require('../tools.js');

const profiles = {
  Facebook: 'https://facebook.com/losaltoshacks',
  Twitter: 'https://twitter.com/losaltoshacks',
  Instagram: 'https://instagram.com/losaltoshacks',
};
/* const embedFields = [];
for (const key in profiles) {
  embedFields.push({ name: key, value: profiles[key], inline: true });
} */

const components = [];
for (const key in profiles) {
  components.push(
    new ButtonBuilder().setLabel(key).setStyle('Link').setURL(profiles[key]),
  );
}

const aboutEmbed = generateEmbed(
  'Social Media',
  'You can check out our online presence at the links below.',
);

const row = new ActionRowBuilder().addComponents(components);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('social')
    .setDescription('Lists our @s!'),
  async execute(client, interaction) {
    await interaction.reply({
      embeds: [aboutEmbed],
      components: [row],
      ephemeral: true,
    });
  },
};

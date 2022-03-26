const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { generateEmbed, generateWarningEmbed } = require('../tools.js');
const { staffChannelId } = require('../config.json');

const warningEmbed = generateWarningEmbed(
  'Warning!',
  'Are you sure you want to ping **all** staff members that you need help? If so, click the button below. Abuse of this command may lead to a ban.',
);

const row = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId('staff')
    .setLabel('Yes, I understand and would like to notify staff.')
    .setStyle('DANGER'),
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('staff')
    .setDescription('Contact staff for help.'),
  async execute(client, interaction) {
    await interaction.reply({
      embeds: [warningEmbed],
      components: [row],
      ephemeral: true,
    });

    // Create a collector for the confirmation button
    const filter = (i) =>
      i.customId === 'staff' && i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      max: 1,
      time: 300000,
    });

    // Disabled Button
    const disabledRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('staff')
        .setLabel('Yes, I understand and would like to notify staff.')
        .setStyle('DANGER')
        .setDisabled(true),
    );

    collector.on('collect', async (i) => {
      const notifyEmbed = new MessageEmbed()
        .setColor([2, 62, 138])
        .setTitle('Request for Help')
        .setAuthor({
          name: i.user.tag,
          iconURL: i.user.avatarURL(),
        })
        .setDescription(
          '**An attendee requires assistance.** Please send them a direct message and ask what they need ASAP!',
        )
        .addFields(
          { name: 'User Tag', value: String(i.user.tag), inline: true },
          { name: 'Request Timestamp', value: String(i.createdAt) },
        );

      await client.channels.cache
        .get(staffChannelId)
        .send({ content: '@everyone', embeds: [notifyEmbed] });

      await i.update({
        embeds: [
          generateEmbed(
            'Staff Notified!',
            "Contacted staff! They'll reach out to you soon.",
          ),
        ],
        ephemeral: true,
        components: [disabledRow],
      });
    });
  },
};

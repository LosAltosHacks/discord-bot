const { MessageEmbed } = require('discord.js');

module.exports = {
  generateEmbed: (title, description) => {
    return new MessageEmbed()
      .setColor([2, 62, 138])
      .setTitle(title)
      .setAuthor({
        name: 'Los Altos Hacks Team',
        iconURL:
          'https://raw.githubusercontent.com/LosAltosHacks/los-altos-hacks/master/frontpage/favicon-new.png',
      })
      .setDescription(description);
  },
  generateWarningEmbed: (title, description) => {
    return new MessageEmbed()
      .setColor('#FC6255')
      .setTitle(title)
      .setAuthor({
        name: 'Los Altos Hacks Team',
        iconURL:
          'https://raw.githubusercontent.com/LosAltosHacks/los-altos-hacks/master/frontpage/favicon-new.png',
      })
      .setDescription(description);
  },
};

let channel_id = '834623079245152266'
const Discord = require('discord.js');
const bot = new Discord.Client();
const botconfig = require('./botconfig.json');
const colors = require('./colors.json');

bot.on('ready', () => {
    var embed = new Discord.MessageEmbed()
        .setColor(colors.cyan)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTitle(`Hackathon & Server Rules`)
    embed.addField("General Rules", "\n\n• No spamming, this includes mention spamming, even as a joke\n• No advertising, regardless of if it is related to hackathons\n• No NSFW content\n• Use appropriate channels\n• Do not abuse h!staff\n• Follow Discord TOS")
    embed.addField("Hackathon Rules", "\n\n• No using source code that isn't open source\n• MLH Code of Conduct: https://static.mlh.io/docs/mlh-code-of-conduct.pdf\n• Only **brainstorming** sessions and design concepts are allowed before April 24 - no actual writing of code")
    bot.channels.cache.get(channel_id).send(embed)
})

bot.login(botconfig.DISCORD_DEVELOPER_SECRET)
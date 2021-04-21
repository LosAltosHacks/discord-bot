module.exports.run = async (bot, message, args, extras) => {
    var profiles = {
        'Facebook': 'https://facebook.com/losaltoshacks',
        'Twitter': 'https://twitter.com/losaltoshacks',
        'Instagram': 'https://instagram.com/losaltoshacks'
    };
    var URLProfiles = [];
    for (var key in profiles) URLProfiles.push(`**${key}:** <${profiles[key]}>`);
        return message.channel.send(`You can check out our online presence at the following links:\n${URLProfiles.join("\n")}`);
}

module.exports.config = {
    name: "social",
    usage: "h!social",
    description: "Lists our @s!",
    accessibleby: "Members"
}
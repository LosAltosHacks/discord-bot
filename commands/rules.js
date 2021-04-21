module.exports.run = async (bot, message, args, extras) => {
    return message.channel.send("**Hackathon rules:** <https://losaltoshacks4.devpost.com>\n**Code of conduct:** <https://github.com/MLH/mlh-policies/blob/master/code-of-conduct.md>");
}

module.exports.config = {
    name: "rules",
    usage: "h!rules",
    description: "See hackathon rules",
    accessibleby: "Members"
}
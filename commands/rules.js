module.exports.run = async (bot, message, args, extras) => {
    return message.channel.send(message.guild.channels.cache.get('834623079245152266').toString());
}

module.exports.config = {
    name: "rules",
    usage: "h!rules",
    description: "See hackathon rules",
    accessibleby: "Members"
}
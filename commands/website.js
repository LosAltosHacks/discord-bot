module.exports.run = async (bot, message, args, extras) => {
    return message.channel.send("https://www.losaltoshacks.com")
}

module.exports.config = {
    name: "website",
    usage: "h!website",
    description: "Los Altos Hacks website!",
    accessibleby: "All members"
}
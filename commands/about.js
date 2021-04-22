module.exports.run = async (bot, message, args, extras) => {
    return message.channel.send("Hi there! I am the **Los Altos Hacks Bot** and I'm a Discord bot made specifically for the Los Altos Hacks Discord. I'm also open-source! You can view my code at <https://github.com/LosAltosHacks/discord-bot>. To view my commands, do `h!help`.");
}

module.exports.config = {
    name: "about",
    usage: "h!about",
    description: "About bot",
    accessibleby: "Members"
}
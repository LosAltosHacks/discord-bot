module.exports.run = async (bot, message, args, extras) => {
    if (message.guild == null) {
        return message.channel.send("You cannot use this command in a DM!");
    }
    bot.guilds.find(guild => guild.name === "Los Altos Hacks").channels.get("418310123904040963").send("@everyone **An attendee requires assistance.** Please send them a direct message and ask what they need ASAP!\n\n**User:** " + message.author);
    return message.channel.send(message.author + " You have successfully notified the staff that you need help. A staff member will get back to you ASAP.");
}

module.exports.config = {
    name: "staff-confirm",
    usage: "h!staff-confirm",
    description: "Pings the staff. Do not abuse this.",
    accessibleby: "Members"
}
module.exports.run = async (bot, message, args, extras) => {
    if (message.guild == null) {
        return message.channel.send("You cannot use this command in a DM!");
    }
    return message.channel.send(message.author + " Are you sure you want to ping **all** staff members that you need help? If so, type `!staff-confirm`. Abuse of this command will lead to a permanent ban from the Discord server.");
}

module.exports.config = {
    name: "staff",
    usage: "h!staff",
    description: "Prompts you to ping staff, if you require assistance",
    accessibleby: ""
}
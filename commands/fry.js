module.exports.run = async (bot, message, args, extras) => {
    if (message.guild == null) {
        return message.channel.send("You cannot use this command in a DM!");
    } else if (message.member.roles.has(message.guild.roles.find(role => role.name === "Director").id) || message.member.roles.has(message.guild.roles.find(role => role.name === "Organizer").id) || message.member.roles.has(message.guild.roles.find(role => role.name === "Sponsor").id) || message.member.roles.has(message.guild.roles.find(role => role.name === "Mentor").id)) {
        if (args == null) return message.channel.send("Yes master... but who?");
        else {
            bot.fetchUser(args[0]).then(function(result) {
                if (message.author == result) return message.channel.send("Master... I could never betray you!");
                else if (message.guild.member(result).roles.has(message.guild.roles.find(role => role.name === "Director").id) && !message.member.roles.has(message.guild.roles.find(role => role.name === "Director").id)) return message.channel.send("How dare you try to fry one of the almighty directors? :angry:\n\n*zaps " + message.author.toString() + " with a lightning bolt :cloud_lightning:*");
                else return message.channel.send("I must obey my masters...\n\n*zaps " + args[0] + " with 10,000 volts of electricity*");
            });
        }
    } else {
        return message.channel.send("I try not to be violent... but you all just keep pushing me...\n\n*zaps " + message.author.toString() + " with an electric shock!*");
    }
}

module.exports.config = {
    name: "fry",
    usage: "b!fry <member>",
    description: "Fries a member with 10,000 volts of electricity, because why not yknow",
    accessibleby: "The Allmighty"
}
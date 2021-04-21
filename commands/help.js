const botconfig = require("../botconfig.json");
const Discord = require('discord.js');
const colors = require("../colors.json");
const prefix = botconfig.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args, extras) => {
    if (message.guild == null) {
        return message.channel.send("You cannot use this command in a DM!");
    }
    if (args[0]) {
        //send info on specific command
        if (bot.commands.has(args[0])) {
            let command = await bot.commands.get(args[0])
            var SHembed = new Discord.MessageEmbed()
                .setColor(colors.cyan)
                .setThumbnail(bot.user.displayAvatarURL)
                .setAuthor(`Help`)
                .setDescription(`The bot prefix is: ${prefix}\n\n
                **Command:** ${command.config.name}\n
                **Description:** ${command.config.description || "No Desciption"}\n
                **Usage:** ${command.config.usage || "No Usage"}\n
                **Accessible by:** ${command.config.accessibleby || "Members"}\n`)
            return message.channel.send(SHembed);
        } else {
            return message.channel.send("Sorry, we don't have that command :(");
        }
    } else {
        //send a dm of all the commands

        var msg = ""
        fs.readdir("./commands", function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                //console.log(file)
                let command = bot.commands.get(file.substring(0, file.length - 3))
                msg = msg + `**${prefix}${command.config.name}**: ${command.config.description} \n`
                console.log(msg)
                //field.push(file.substring(0, file.length-3))
            });
            message.channel.send("Check your dms!")
            message.author.send(msg)
        });

    }
}

module.exports.config = {
    name: "help",
    usage: "h!help **OR** h!help <command>",
    description: "Lists commands **OR** lists ",
    accessibleby: "Members"
}
const Discord = require('discord.js');
const post = require('request')
const fs = require("fs");
const botconfig = require("./botconfig.json")

const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


//iterating through all the commands in the folder and placing them in the collection
fs.readdir("./commands/", (err, files) => {
	
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }
    try {
        jsfile.forEach((f, i) => {
            let pull = require(`./commands/${f}`);
            bot.commands.set(pull.config.name, pull);
			console.log(pull.config.name)
        });
    } catch (e) {
        console.error(e)
    }
});

bot.on('ready', () => {
	//setting status
	bot.user.setActivity("h!help for help");

	console.log("Successfully logged in!");
});

bot.on('message', message => {
	//ignore if the message is from a bot
	if(message.author.bot) return;

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	//separating command from arguments
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	//search the collection for the corresponding file, if it exists
	let commandFile = bot.commands.get(cmd.slice(prefix.length));
	//run the command, if it exists
	if(commandFile) commandFile.run(bot, message, args, {"token": botconfig.BACKEND_JWT_TOKEN})
});

bot.login(botconfig.DISCORD_DEVELOPER_SECRET);


// client.on('message', message => {
// 	// Check if we're in a DM and Jamsheed is the sender
// 	if (message.guild == null && message.author.id == "173556767383355392") {
// 		// Check if we're using a command
// 		if (message.content.substr(0, 1) == "!") {
// 			// Use the channel as the command and send the rest of the arguments as the message in the Los Altos Hacks guild
// 			var separate = message.content.split(" ");
// 			var channel = separate[0].substr(1).toLowerCase();
// 			separate.splice(0, 1);
// 			var text = separate.join(" ");
// 			client.guilds.find(guild => guild.name === "Los Altos Hacks").channels.find(c => c.name === channel).send(text);
// 		}
// 	} else {
// 		// Ensure they are using a command
// 		if (message.content.substr(0, 1) == "!") {
// 			// Get the command and its argument
// 			var separate = message.content.split(" ");
// 			var command = separate[0].substr(1).toLowerCase();
// 			var argument = 1 in separate ? separate[1].toLowerCase() : null;
			
// 			// Delete all messages sent to the #verify channel
// 			if (message.channel.name == "verify" && command != "verify") {
// 				message.delete();
// 				return;
// 			}
			
// 			// Check if it's a command or alias, and execute if so
// 			if (getListOfCommands().indexOf(command) > -1 || getListOfHiddenCommands().indexOf(command) > -1) {
// 				executeCommand(command, message, argument);
// 			} else if (command in getListOfAliases()) {
// 				executeCommand(getListOfAliases()[command], message, argument);
// 			} else {
// 				message.channel.send("Unknown command! Type `!commands` for a list of commands.");
// 			}
// 		}
// 		if (message.channel.name == "verify" && !message.author.bot) {
// 			message.delete();
// 		}
// 	}
// });


function getListOfCommands() {
	return [
		'about',
		'help',
		'commands',
		'rules',
		'social',
		'staff',
		'website'
	];
}

function getListOfAliases() {
	return {
		'twitter': 'social',
		'facebook': 'social',
		'instagram': 'social'
	};
}

function getListOfHiddenCommands() {
	return [
		'fry',
		'verify',
		'staff-confirm'
	];
}

function executeCommand(command, message, argument) {
	// switch (command) {
	// 	case 'about':
	// 		message.channel.send("Hi there! I am the **Los Altos Hacks Bot** and I'm a Discord bot made specifically for the Los Altos Hacks Discord. I'm also open-source! You can view my code at <https://github.com/LosAltosHacks/discord-bot>. To view my commands, do `!commands`.");
	// 	break;
	// 	case 'help':
	// 		message.channel.send("**Hi there! If you need help, here's what I can do:**\n- If you want a list of commands, type `!commands`.\n- Some frequently asked questions can be found on our `!website`.\n- If you want to know the rules about Los Altos Hacks, view them using `!rules`.\n- If you want help from a mentor, you can go into the <#554415837574987843> channel and ask for help.\n- If you want to contact a staff member, you can do `!staff` and one will try to assist you as soon as possible!");
	// 	break;
	// 	case 'commands':
	// 		var commands = getListOfCommands();
	// 		for (var i = 0; i < commands.length; i ++) commands[i] = `\`!${commands[i]}\``;
	// 			message.channel.send(`All available commands: ${commands.join(", ")}`);
	// 	break;
	// 	case 'rules':
	// 		message.channel.send("**Hackathon rules:** <https://losaltoshacks4.devpost.com>\n**Code of conduct:** <https://github.com/MLH/mlh-policies/blob/master/code-of-conduct.md>");
	// 	break;
	// 	case 'social':
	// 		var profiles = {
	// 			'Facebook': 'https://facebook.com/losaltoshacks',
	// 			'Twitter': 'https://twitter.com/losaltoshacks',
	// 			'Instagram': 'https://instagram.com/losaltoshacks'
	// 		};
	// 		var URLProfiles = [];
	// 		for (var key in profiles) URLProfiles.push(`**${key}:** <${profiles[key]}>`);
	// 			message.channel.send(`You can check out our online presence at the following links:\n${URLProfiles.join("\n")}`);
	// 	break;
	// 	case 'staff':
	// 		message.channel.send(message.author + " Are you sure you want to ping **all** staff members that you need help? If so, type `!staff-confirm`. Abuse of this command will lead to a permanent ban from the Discord server.");
	// 	break;
	// 	case 'staff-confirm':
	// 		bot.guilds.find(guild => guild.name === "Los Altos Hacks").channels.get("418310123904040963").send("@everyone **An attendee requires assistance.** Please send them a direct message and ask what they need ASAP!\n\n**User:** " + message.author);
	// 		message.channel.send(message.author + " You have successfully notified the staff that you need help. A staff member will get back to you ASAP.");
	// 	break;
	// 	case 'website':
	// 		message.channel.send("View our site at <https://losaltoshacks.com>. We also have a **live dashbaord** which can be viewed at <https://losaltoshacks.com/dashboard>.");
	// 	break;
	// 	case 'fry':
	// 		if (message.guild == null) {
	// 			message.channel.send("You cannot use this command in a DM!");
	// 		} else if (message.member.roles.has(message.guild.roles.find(role => role.name === "Director").id) || message.member.roles.has(message.guild.roles.find(role => role.name === "Organizer").id) || message.member.roles.has(message.guild.roles.find(role => role.name === "Sponsor").id) || message.member.roles.has(message.guild.roles.find(role => role.name === "Mentor").id)) {
	// 			if (argument == null) message.channel.send("Yes master... but who?");
	// 			else {
	// 				bot.fetchUser(argument.substring(3, argument.length - 1)).then(function(result) {
	// 					if (message.author == result) message.channel.send("Master... I could never betray you!");
	// 					else if (message.guild.member(result).roles.has(message.guild.roles.find(role => role.name === "Director").id) && !message.member.roles.has(message.guild.roles.find(role => role.name === "Director").id)) message.channel.send("How dare you try to fry one of the almighty directors? :angry:\n\n*zaps " + message.author.toString() + " with a lightning bolt :cloud_lightning:*");
	// 					else message.channel.send("I must obey my masters...\n\n*zaps " + argument + " with 10,000 volts of electricity*");
	// 				});
	// 			}
	// 		} else {
	// 			message.channel.send("I try not to be violent... but you all just keep pushing me...\n\n*zaps " + message.author.toString() + " with an electric shock!*");
	// 		}
	// 	break;
	// 	case 'verify':
	// 		if (message.guild == null) {
	// 			message.channel.send("You cannot use this command in a DM!");
	// 		} else if (message.channel.name !== "verify") {
	// 			message.delete();
	// 		} else {
	// 			if (argument == null) {
	// 				message.channel.send(message.author + " Usage: `!verify <email>`. Please supply an email.").then(newMessage => setTimeout(function() { newMessage.delete(); }, 5000));
	// 			} else {
	// 				if (argument.substring(0, 1) == "<" && argument.substring(argument.length - 1, argument.length) == ">") argument = argument.substring(1, argument.length - 1);

	// 				requestVerification(argument, function(role, name) {
	// 					switch (role) {
	// 						case "attendee":
	// 							message.guild.fetchMember(message.author).then((member) => {
	// 								member.addRole(message.guild.roles.find(r => r.name === "Attendee").id);
	// 								member.setNickname(name);
	// 							});
	// 						break;
	// 						case "mentor":
	// 							message.guild.fetchMember(message.author).then((member) => {
	// 								member.addRole(message.guild.roles.find(r => r.name === "Mentor").id);
	// 								member.setNickname(name + " | Mentor");
	// 							});
	// 						break;
	// 						case "chaperone":
	// 							message.guild.fetchMember(message.author).then((member) => {
	// 								member.addRole(message.guild.roles.find(r => r.name === "Chaperone").id);
	// 								member.setNickname(name + " | Chaperone");
	// 							});
	// 						break;
	// 						case "judge":
	// 							message.guild.fetchMember(message.author).then((member) => {
	// 								member.addRole(message.guild.roles.find(r => r.name === "Judge").id);
	// 								member.setNickname(name + " | Judge");
	// 							});
	// 						break;
	// 						case "sponsor":
	// 							message.guild.fetchMember(message.author).then((member) => {
	// 								member.addRole(message.guild.roles.find(r => r.name === "Sponsor").id);
	// 								member.setNickname(name + " | Sponsor");
	// 							});
	// 						break;
	// 						default:
	// 							message.channel.send(message.author + " An unknown error occurred. Please try again in a few minutes or contact a staff member.").then(newMessage => setTimeout(function() { newMessage.delete(); }, 5000));
	// 						break;
	// 					}
	// 				}, function(errorMessage) {
	// 					if (typeof errorMessage === 'object' && 'email' in errorMessage) {
	// 						message.channel.send(message.author + " That is not a valid email! Please include your full email.").then(newMessage => setTimeout(function() { newMessage.delete(); }, 5000));
	// 						return;
	// 					}

	// 					switch (errorMessage) {
	// 						case "Email not verified":
	// 							message.channel.send(message.author + " Your email has not been verified. Please verify your email by clicking the link in the email you got when you signed up for Los Altos Hacks.").then(newMessage => setTimeout(function() { newMessage.delete(); }, 5000));
	// 						break;
	// 						case "Email not found in database":
	// 							message.channel.send(message.author + " Your email is not in our database. Please ensure that you are typing your email correctly!").then(newMessage => setTimeout(function() { newMessage.delete(); }, 5000));
	// 						break;
	// 						case "Not accepted":
	// 							message.channel.send(message.author + " We have received your application, however you have not been accepted or waitlisted yet. Once this happens, you will be able to join the Discord.").then(newMessage => setTimeout(function() { newMessage.delete(); }, 5000));
	// 						break;
	// 						default:
	// 							message.channel.send(message.author + " An unknown error occurred: " + errorMessage).then(newMessage => setTimeout(function() { newMessage.delete(); }, 5000));
	// 						break;
	// 					}
	// 				});
	// 			}
	// 		}
	// 	break;
	// }
}

function requestVerification(email, success, error) {
	post({
		url: 'https://api.losaltoshacks.com/discord/v1/discord-verify',
		form: {
			email: email
		},
		headers: {
			'Authorization': 'Bearer ' + BACKEND_JWT_TOKEN
		}
	}, function(err, response, body) {
		var data;
		try {
			data = JSON.parse(body);
		} catch (e) {
			error('Backend malfunction, please try again later.');
			return;
		}

		if ('message' in data) error(data['message']);
		else if ('role' in data && 'name' in data) success(data['role'], data['name']);
	});
}
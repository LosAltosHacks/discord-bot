const request = require('request')
const botconfig = require('../botconfig.json')
const attendeeRole = "667153473225228288"

module.exports.run = async (bot, message, args, extras) => {
    if (message.channel.name != "verify") return message.delete()
    if (args[0] == null) return message.channel.send(message.author + " Usage: `!verify <email>`. Please supply an email.").then(newMessage => setTimeout(function () { newMessage.delete(); }, 5000));

    var options = {
        'method': 'POST',
        'url': 'https://api.losaltoshacks.com/auth/token',
        'headers': {
            'Content-Type': 'multipart/form-data'
        },
        formData: {
            'username': botconfig.username,
            'password': botconfig.password
        }
    };

    request(options, function (error, response) {
        if (error) return message.channel.send(
            "Oops, something went wrong. Please inform staff with h!staff."
        )
        else botconfig.BACKEND_JWT_TOKEN = JSON.parse(response.body).access_token
        console.log(JSON.parse(response.body).access_token)
        console.log(botconfig.BACKEND_JWT_TOKEN);
    });

    //Now that we have the token, we can use it to see if the email is registered

    options = {
        'method': 'GET',
        'url': 'https://api.losaltoshacks.com/attendees/search?email=' + args[0],
        'headers': {
            'Authorization': 'Bearer ' + botconfig.BACKEND_JWT_TOKEN
        }
    };

    request(options, function (error, response) {
        
        if(error) console.log(error)
        else console.log(JSON.parse(response.body))
        if(JSON.parse(response.body).length > 0) {
            //exists
            let body = JSON.parse(response.body)[0]
            message.guild.members.fetch(message.author).then((member) => {
                member.roles.add(attendeeRole)
                console.log(body.first_name)
                member.setNickname(body.first_name + " " + body.last_name);
            
            });
            message.delete();
            return message.channel.send("Verified!").then(newMessage => setTimeout(function () { newMessage.delete(); }, 1000));
        } else {
            message.channel.send("Looks like you haven't registered yet. You can do so at www.losaltoshacks.com/registration! If you think this is a mistake, contact staff with !staff").then(newMessage => setTimeout(function () { newMessage.delete(); }, 8000));
            message.delete()
            return;
        }
    });
}

module.exports.config = {
    name: "verify",
    usage: "verify <email>",
    description: "Verify yourself to access the rest of the discord",
    accessibleby: "All members"
}

var Discord = require('discord.io');
var token = require('../info/settings.json');
 

var bot = new Discord.Client({
    token: token["token"],
    autorun: true
});

console.log(token["token"])
 
bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});
 
bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }
});
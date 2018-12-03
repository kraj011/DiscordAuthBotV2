var Discord = require('discord.io');
 
var bot = new Discord.Client({
    token: "NTE5MDE2NjczNzk0MzI2NTM5.DuZLfg.LCVR-6y4QV0QIceM8eDAogTRels",
    autorun: true
});
 
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
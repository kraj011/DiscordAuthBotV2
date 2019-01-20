var Discord = require('discord.js');
var token = require('../info/settings.json');
var fs = require('fs');
 

const { Client, MessageEmbed, DMChannel } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  // If the message is "how to embed"
  if(message.author.bot) return;

  console.log("got message!")
  if (message.channel.type == "dm") {
    var messageSplit = message.content.split(" ");
    if(messageSplit[0] == "!activate") {
        // activating key
        console.log("got activate!")
       
        if(messageSplit.length != 2) {
            // wrong format
            console.log("wrong format!")
            return
        }
        var key = messageSplit[1]


        fs.readFile(__dirname + "/../info/users.json", function(err, data) {
            if(err) {
                console.log(err)
            }

            var json = JSON.parse(data);
            // console.log(json)
            var keyFound = false
            for(var i = 0; i < Object.keys(json).length; i++) {
                var cKey = Object.keys(json)[i]
                console.log(cKey)
                if(cKey == key) {
                    console.log("key found!")
                    keyFound = true;
                    if(json[i] == "none") {
                        // bind discord here
                    } else {
                        console.log("key already in use")
                        const embed = new MessageEmbed()
                        // Set the title of the field
                        .setTitle('A slick little embed')
                        // Set the color of the embed
                        .setColor(0xFF0000)
                        // Set the main content of the embed
                        .setDescription('Hello, this is a slick embed!')
                        
                        
                        message.author.sendEmbed(embed, "TEST!");
                        return
                    }
                }
            }
            if(!keyFound) {
                // key invalid
                return
            }

        })




    }  else if(message.content.startsWith == "!deactivaate") {
        // deactivating key
    }  
   
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me

client.login("NTM2NTkxMzQwMzY5MzQ2NTc3.DyY7Jw.vQnK5RkNy3ybD8-G_6pgaBnv94I")




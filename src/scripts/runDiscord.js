var Discord = require('discord.js');
var token = require('../info/settings.json');
var fs = require('fs');


const {
    Client,
    MessageEmbed,
    DMChannel
} = require('discord.js');

// Create an instance of a Discord client
const client = new Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('Discord AUTH BOT running!');
});

client.on('message', message => {
    // If the message is "how to embed"
    if (message.author.bot) return;

    if (message.channel.type == "dm") {
        var messageSplit = message.content.split(" ");
        if (messageSplit[0] == "!activate") {
            // activating key

            if (messageSplit.length != 2) {
                // wrong format
                console.log("wrong format!")
                return
            }
            var key = messageSplit[1]
            analyzeKey(message, key);

        } else if (messageSplit[0] == "!deactivate") {
            // deactivating key
            deactivateKey(message);
        } else if (messageSplit[0] == "!help") {
            // help
            displayHelp(message)
        }

    }
});

function testStuff(message) {
    var role = client.guilds.first().roles.find("name", "Verified");
    client.guilds.first().members.find((m) => {
        if (m.id == message.author.id) {
            m.addRole(role)
        }
    })
}

function analyzeKey(message, key) {
    fs.readFile(__dirname + "/../info/users.json", function (err, data) {
        if (err) {
            console.log(err)
        }

        var json = JSON.parse(data);
        // console.log(json)
        var keyFound = false
        for (var i = 0; i < Object.keys(json).length; i++) {
            var cKey = Object.keys(json)[i]
            console.log(cKey)
            if (cKey == key) {
                console.log("key found!")
                keyFound = true;

                if (json[cKey] == "none") {
                    // bind discord here
                    json[cKey] = message.author.id;
                    fs.writeFile(__dirname + "/../info/users.json", JSON.stringify(json), function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    message.channel.send({
                        embed: {
                            color: 0x00ff00,
                            description: "Activated!"
                        }
                    });
                    fs.readFile(__dirname + "/../info/settings.json", function (err2, settingsData) {
                        let settings = JSON.parse(settingsData)
                        if (settings["roleToAdd"] != "") {
                            var role = client.guilds.first().roles.find("name", settings["roleToAdd"]);
                            client.guilds.first().members.find((m) => {
                                if (m.id == message.author.id) {
                                    m.addRole(role)
                                }
                            })
                        }
                        if (settings["roleToRemove"] != "") {
                            var role = client.guilds.first().roles.find("name", settings["roleToRemove"]);
                            client.guilds.first().members.find((m) => {
                                if (m.id == message.author.id) {
                                    m.removeRole(role)
                                }
                            })
                        }
                    })


                } else {
                    console.log("key already in use")

                    message.channel.send({
                        embed: {
                            color: 0xff0000,
                            description: "Key already in use!"
                        }
                    });
                    return
                }
            }
        }
        if (!keyFound) {
            // key invalid
            message.channel.send({
                embed: {
                    color: 0xff0000,
                    description: "Key not found!"
                }
            });
            return
        }

    })
}

function displayHelp(message) {
    message.channel.send({
        embed: {
            color: 0x00ff00,
            description: "Usage: !activate <<key>> or !deactivate <<key>>"
        }
    });
    return
}

function deactivateKey(message) {
    console.log("deactivate key called")
    fs.readFile(__dirname + "/../info/users.json", function (err, data) {
        if (err) {
            console.log(err);
        }

        var json = JSON.parse(data);
        // console.log(json)
        for (let key in json) {
            if (json[key] === message.author.id) {
                // key valid.
                json[key] === 'none'; //unbind the key.
                fs.writeFile(__dirname + "/../info/users.json", JSON.stringify(json), function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                message.channel.send({
                    embed: {
                        color: 0x00ff00,
                        description: "Key deactivated."
                    }
                });
                fs.readFile(__dirname + "/../info/settings.json", function (err2, settingsData) {
                    let settings = JSON.parse(settingsData)
                    if (settings["roleToAdd"] !== "") {
                        var role = client.guilds.first().roles.find("name", settings["roleToAdd"]);
                        client.guilds.first().members.find((m) => {
                            if (m.id == message.author.id) {
                                m.removeRole(role)
                            }
                        })
                    }
                    if (settings["roleToRemove"] !== "") {
                        var role = client.guilds.first().roles.find("name", settings["roleToRemove"]);
                        client.guilds.first().members.find((m) => {
                            if (m.id == message.author.id) {
                                m.addRole(role)
                            }
                        })
                    }
                })
                return;
            }
        }
        // we didn't return, so key wasn't unbinded.
        message.channel.send({
            embed: {
                color: 0xff0000,
                description: "You do not have a valid key."
            }
        });
    })
}


// Log your bot in using the token from https://discordapp.com/developers/applications/me
fs.readFile(__dirname + "/../info/settings.json", function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    let json = JSON.parse(data);
    if (json["token"] != '') {
        client.login(json["token"])
    } else {
        console.log("Token empty! Not starting bot!")
    }
})
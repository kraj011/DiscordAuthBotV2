const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const settingsAdapter = new FileSync(__dirname + '/../info/settings.json')
const dbSettings = low(settingsAdapter)

const usersAdapter = new FileSync(__dirname + '/../info/users.json')
const dbUsers = low(usersAdapter)


const {
    Client
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


function analyzeKey(message, key) {
    dbSettings.read();
    dbUsers.read();

    if (dbUsers.get(key).isUndefined().value()) {
        message.channel.send({
            embed: {
                color: 0xff0000,
                description: "Key not found!"
            }
        });
        return
    }

    if (dbUsers.get(key).value() !== "none") {
        message.channel.send({
            embed: {
                color: 0xff0000,
                description: "Key already in use!"
            }
        });
        return
    }
    let authorId = message.author.id;
    dbUsers.set(key, authorId).write();

    if (dbSettings.get('roleToAdd').value() !== "") {
        var role = client.guilds.first().roles.find("name", dbSettings.get('roleToAdd').value());
        client.guilds.first().members.find((m) => {
            if (m.id == message.author.id) {
                m.addRole(role)
            }
        })
    }
    if (dbSettings.get('roleToRemove').value() !== "") {
        var role = client.guilds.first().roles.find("name", dbSettings.get('roleToRemove').value());
        client.guilds.first().members.find((m) => {
            if (m.id == message.author.id) {
                m.removeRole(role)
            }
        })
    }
    message.channel.send({
        embed: {
            color: 0x00ff00,
            description: "Activated!"
        }
    });

    return;
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
    dbSettings.read();
    dbUsers.read();
    let keys = dbUsers.keys().value();
    for (let key in keys) {
        if (dbUsers.get(keys[key]).value() === message.author.id) {
            dbUsers.set(keys[key], 'none').write();
            message.channel.send({
                embed: {
                    color: 0x00ff00,
                    description: "Key deactivated."
                }
            });
            if (dbSettings.get('roleToAdd').value() !== "") {
                var role = client.guilds.first().roles.find("name", dbSettings.get('roleToAdd').value());
                client.guilds.first().members.find((m) => {
                    if (m.id == message.author.id) {
                        m.removeRole(role)
                    }
                })
            }
            if (dbSettings.get('roleToRemove').value() !== "") {
                var role = client.guilds.first().roles.find("name", dbSettings.get('roleToRemove').value());
                client.guilds.first().members.find((m) => {
                    if (m.id == message.author.id) {
                        m.addRole(role)
                    }
                })
            }
            return
        }
    }
    message.channel.send({
        embed: {
            color: 0x00ff00,
            description: "You are not binded to a key."
        }
    });

}


// Log your bot in using the token from https://discordapp.com/developers/applications/me
function botLogin() {
    dbSettings.read();
    let token = dbSettings.get("token").value();
    if (dbSettings.get("token").isUndefined().value()) {
        console.log("No token! Could not start discord bot!")
        return;
    }
    if (token === "") {
        console.log("Token empty! Not starting bot!")
        return;
    }
    client.login(token);
}

botLogin();
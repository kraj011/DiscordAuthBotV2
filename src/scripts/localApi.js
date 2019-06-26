const express = require('express')
var bodyParser = require('body-parser');
var fs = require('fs');
const app = express()
const port = 8001

let unbindQueue = [];
var isUnbinding = false;
var unbindTimeout = null

app.use(bodyParser.json());


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

app.post('/unbind', (req, res) => {
    if (!req.body.key) {
        res.send(JSON.stringify({
            "error": "No Key Specified"
        }));
        return
    }
    addToUnbindQueue(req.body.key, res);
})

app.post('/generate', (req, res) => {
    if (!req.body.amount || !req.body.length) {
        res.send(JSON.stringify({
            "error": "No Amount or Length Specified"
        }));
        return
    }
    generateKeys(parseInt(req.body.length), parseInt(req.body.amount), res);
})

app.post('/token', (req, res) => {
    if (req.body.token == null) {
        res.send(JSON.stringify({
            "error": "No Token Specified"
        }));
        return
    }
    saveToken(req.body.token, res);
})

app.post('/roleToAdd', (req, res) => {
    if (req.body.role == null) {
        console.log("ROLE NOT SPECIFIED")
        res.send(JSON.stringify({
            "error": "No Role Specified"
        }));
        return
    }
    saveRoleToAdd(req.body.role, res);
})

app.post('/roleToRemove', (req, res) => {
    if (req.body.role == null) {
        res.send(JSON.stringify({
            "error": "No Role Specified"
        }));
        return
    }
    saveRoleToRemove(req.body.role, res);
})

function addToUnbindQueue(key, res) {
    if (unbindQueue.indexOf(key) == -1) {
        unbindQueue.push(key);
    }
    if (isUnbinding) {
        unbindTimeout = setTimeout(() => {
            addToUnbindQueue(key, res);
        }, 200);
    } else {
        // clearTimeout(unbindTimeout);
        unbindTimeout = null;
        isUnbinding = true;
        deactivateKey(unbindQueue[0], res);
    }
}

app.listen(port, () => console.log(`Local Api started on port ${port}!`))

function deactivateKey(key, res) {
    fs.readFile(__dirname + "/../info/users.json", function (err, data) {
        if (err) {
            console.log(err)
        }

        var json = JSON.parse(data);
        // console.log(json)
        var keyFound = false
        for (var i = 0; i < Object.keys(json).length; i++) {
            var cKey = Object.keys(json)[i]
            if (cKey == key) {
                keyFound = true;

                if (json[cKey] == "none") {
                    // key already unbound 
                    sendSuccess(res, key);
                    return
                } else {
                    // check if key is the user's 

                    json[cKey] = "none";
                    fs.writeFile(__dirname + "/../info/users.json", JSON.stringify(json), function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    sendSuccess(res, key);
                    return
                }
            }
        }
        if (!keyFound) {
            // key invalid
            sendError(res, key);
            return
        }

    })
}

function sendSuccess(res, key) {
    res.set("Access-Control-Allow-Origin", "*")
    res.send(JSON.stringify({
        "success": "true"
    }))
    unbindQueue.splice(unbindQueue.indexOf(key), 1);
    isUnbinding = false;

    return;
}

function sendError(res, key) {

    res.send(JSON.stringify({
        "success": "false"
    }))

    isUnbinding = false;
    return;
}

function generateKeys(length, amount, res) {
    let newKeys = {}
    for (let i = 0; i < amount; i++) {
        let newKey = randomString(length);
        newKeys[newKey] = "none"
    }

    fs.writeFile(__dirname + "/../info/recentlyGeneratedKeys.json", JSON.stringify(newKeys), function (err) {
        if (err) {
            console.log(err);
        }
    });

    fs.readFile(__dirname + "/../info/users.json", function (err, data) {
        if (err) {
            console.log(err);
        }
        let json = JSON.parse(data);
        for (var i = 0; i < amount; i++) {
            json[Object.keys(newKeys)[i]] = "none";
        }
        fs.writeFile(__dirname + "/../info/users.json", JSON.stringify(json), function (err) {
            if (err) {
                console.log(err);
            }
        });
    })

    res.send({
        "success": "true"
    })
}

function randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$&*#%@';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function saveToken(token, res) {

    fs.readFile(__dirname + "/../info/settings.json", function (err, data) {
        let json = JSON.parse(data);
        json["token"] = token;
        fs.writeFile(__dirname + "/../info/settings.json", JSON.stringify(json), function (err) {
            if (err) {
                console.log(err);
            }
        });
    })

    res.send({
        "success": true
    })
    return;
}

function saveRoleToAdd(role, res) {
    console.log(`ROLE IS EMPTY: ${role === ""}`)
    fs.readFile(__dirname + "/../info/settings.json", function (err, data) {
        let json = JSON.parse(data);
        json["roleToAdd"] = role;
        fs.writeFile(__dirname + "/../info/settings.json", JSON.stringify(json), function (err) {
            if (err) {
                console.log(err);
            }
        });
    })

    res.send({
        "success": true
    })
    return;
}

function saveRoleToRemove(role, res) {

    fs.readFile(__dirname + "/../info/settings.json", function (err, data) {
        let json = JSON.parse(data);
        json["roleToRemove"] = role;
        fs.writeFile(__dirname + "/../info/settings.json", JSON.stringify(json), function (err) {
            if (err) {
                console.log(err);
            }
        });
    })

    res.send({
        "success": true
    })
    return;
}
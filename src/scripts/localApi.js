const express = require('express')
var bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const settingsAdapter = new FileSync(__dirname + '/../info/settings.json')
const dbSettings = low(settingsAdapter)

const usersAdapter = new FileSync(__dirname + '/../info/users.json')
const dbUsers = low(usersAdapter)

const recentKeysAdapter = new FileSync(__dirname + '/../info/recentlyGeneratedKeys.json')
const dbRecentKeys = low(recentKeysAdapter)

var fs = require('fs')
const app = express()
const port = 8001

let unbindQueue = []
var isUnbinding = false
var unbindTimeout = null

app.use(bodyParser.json())

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

app.post('/unbind', (req, res) => {
  if (!req.body.key) {
    res.send(
      JSON.stringify({
        error: 'No Key Specified',
      })
    )
    return
  }
  addToUnbindQueue(req.body.key, res)
})

app.post('/generate', (req, res) => {
  if (!req.body.amount || !req.body.length) {
    res.send(
      JSON.stringify({
        error: 'No Amount or Length Specified',
      })
    )
    return
  }
  generateKeys(parseInt(req.body.length), parseInt(req.body.amount), res)
})

app.post('/token', (req, res) => {
  if (req.body.token == null) {
    res.send(
      JSON.stringify({
        error: 'No Token Specified',
      })
    )
    return
  }
  saveToken(req.body.token, res)
})

app.post('/roleToAdd', (req, res) => {
  if (req.body.role == null) {
    console.log('ROLE NOT SPECIFIED')
    res.send(
      JSON.stringify({
        error: 'No Role Specified',
      })
    )
    return
  }
  saveRoleToAdd(req.body.role, res)
})

app.post('/roleToRemove', (req, res) => {
  if (req.body.role == null) {
    res.send(
      JSON.stringify({
        error: 'No Role Specified',
      })
    )
    return
  }
  saveRoleToRemove(req.body.role, res)
})

app.listen(port, () => console.log(`Local Api started on port ${port}!`))


function addToUnbindQueue(key, res) {
  if (unbindQueue.indexOf(key) == -1) {
    unbindQueue.push(key)
  }
  if (isUnbinding) {
    unbindTimeout = setTimeout(() => {
      addToUnbindQueue(key, res)
    }, 200)
  } else {
    unbindTimeout = null
    isUnbinding = true
    deactivateKey(unbindQueue[0], res)
  }
}

function deactivateKey(keyPassedIn, res) {
  dbSettings.read();
  dbUsers.read();
  let keys = dbUsers.keys().value();
  for (let key in keys) {
    if (keys[key] === keyPassedIn) {
      dbUsers.set(keyPassedIn, 'none').write();
      sendSuccess(res, keyPassedIn);
      return
    }
  }
  sendError(res, keyPassedIn);
}

function sendSuccess(res, key) {
  res.set('Access-Control-Allow-Origin', '*')
  res.send(
    JSON.stringify({
      success: 'true',
    })
  )
  unbindQueue.splice(unbindQueue.indexOf(key), 1)
  isUnbinding = false

  return
}

function sendError(res, key) {
  res.send(
    JSON.stringify({
      success: 'false',
    })
  )

  isUnbinding = false
  return
}

function generateKeys(length, amount, res) {
  dbRecentKeys.read();
  dbUsers.read();
  let newKeys = {}
  for (let i = 0; i < amount; i++) {
    let newKey = randomString(length)
    dbUsers.set(newKey, 'none').write();
    newKeys[newKey] = 'none'
  }
  fs.writeFile(
    __dirname + '/../info/recentlyGeneratedKeys.json',
    JSON.stringify(newKeys),
    function (err) {
      if (err) {
        console.log(err)
      }
    }
  )

  res.send({
    success: 'true',
  })
}

function randomString(length) {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$&*#%@'
  var result = ''
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function saveToken(token, res) {
  dbSettings.read();
  dbSettings.set("token", token).write();
  res.send({
    success: true,
  })
  return
}

function saveRoleToAdd(role, res) {
  dbSettings.read();
  dbSettings.set("roleToAdd", role).write();
  res.send({
    success: true,
  })
  return
}

function saveRoleToRemove(role, res) {
  dbSettings.read();
  dbSettings.set("roleToRemove", role).write();
  res.send({
    success: true,
  })
  return
}
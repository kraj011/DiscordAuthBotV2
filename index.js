// This is the entry file. Run any starting code here.
const express = require('express');
var app = express();
const port = 3000



function init() {
    app.get('/', function (req, res) {
       return res.sendFile(__dirname + '/screens/entry.html')
    })

    app.listen(port, () => console.log(`Discord Auth Bot listening on port ${port}!`))
}

init();

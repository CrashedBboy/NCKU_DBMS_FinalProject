const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

var app = express();

app.use(express.static(path.resolve(path.join(__dirname, "../static"))));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
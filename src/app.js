const express = require('express');
const sqlite3 = require('sqlite3');

var app = express();

var db = new sqlite3.Database(':memory:');
db.run('CREATE TABLE lorem (info TEXT)');

app.get('/', function (req, res) {
    res.send('Hello World!');

    db.serialize(function () {
        
        var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

        for (var i = 0; i < 10; i++) {
            stmt.run('Ipsum ' + i);
        }

        stmt.finalize();

        db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
            console.log(row.id + ': ' + row.info);
        });
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
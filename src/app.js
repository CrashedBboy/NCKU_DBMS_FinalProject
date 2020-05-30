const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const fs = require('fs');

// copy default database file to read / write
const DEFAULT_DB = "../database/database.default.sqlite3";
const RUNTIME_DB = "../database/database.sqlite3";

let defaultDBPath = path.resolve(path.join(__dirname, DEFAULT_DB));
let runtimeDBPath = path.resolve(path.join(__dirname, RUNTIME_DB));

console.log("coping default DB file for runtime...");
fs.copyFileSync(defaultDBPath, runtimeDBPath);

var db = new sqlite3.Database(runtimeDBPath);

// create Express.js app
var app = express();

console.log("Serving static assets ...");
app.use('/static', express.static(path.resolve(path.join(__dirname, "../static"))));

app.get('/', function (req, res) {
    res.redirect("template.html");
});

app.get('/data', (req, res) => {

    let data = new Object();

    db.serialize(() => {
        
        let articleSQL = "SELECT * FROM Article;";
        db.all(articleSQL, (err, articles) => {
            data.articles = articles;
        });

        let boardSQL = "SELECT * FROM Board;";
        db.all(boardSQL, (err, boards) => {
            data.boards = boards;
        });

        let boardRuleSQL = "SELECT * FROM BoardRule;";
        db.all(boardRuleSQL, (err, rules) => {
            data.boardRules = rules;
        });

        let board_boardRuleSQL = "SELECT * FROM Board_BoardRule;";
        db.all(board_boardRuleSQL, (err, mappings) => {
            data.board_boardRules = mappings;
        });

        let board_userSQL = "SELECT * FROM Board_User;";
        db.all(board_userSQL, (err, mappings) => {
            data.board_users = mappings;
        });

        let commentSQL = "SELECT * FROM Comment;";
        db.all(commentSQL, (err, comments) => {
            data.comments = comments;
        });

        let userSQL = "SELECT * FROM User;";
        db.all(userSQL, (err, users) => {
            data.users = users;

            // return response
            res.json(data);
        });
    });
});

app.listen(3000, function () {
    console.log('app listening on port 3000!');
});
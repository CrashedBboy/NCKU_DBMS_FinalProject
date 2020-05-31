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

// express setting for decoding request
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// serving static assets
console.log("Serving static assets ...");
app.use('/static', express.static(path.resolve(path.join(__dirname, "../static"))));

app.get('/', function (req, res) {
    res.redirect("template.html");
});

// [API] Get all DB rows
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

// [API] create a new user
app.post('/api/gui/register', (req, res) => {

    let dateString = new Date().toLocaleDateString();
    db.serialize(() => {

        let sql = `INSERT INTO User (account, nickname, password, signature, created_at) VALUES 
                ('${req.body.account}', '${req.body.nickname}', '${req.body.password}', '${req.body.signature}', '${dateString}');`;

        db.run(sql, (err) => {

            if (err) {
                return res.json({
                    result: false,
                    error: err
                });
            }

            return res.json({
                result: true
            });
        });
    });
});

// [API] alter nickname for a user
app.post('/api/gui/nickname', (req, res) => {

    db.serialize(() => {

        let sql = `UPDATE User SET nickname='${req.body.nickname}' WHERE id=${req.body.id};`;

        db.run(sql, (err) => {

            if (err) {
                return res.json({
                    result: false,
                    error: err
                });
            }

            return res.json({
                result: true
            });
        });
    });
});

// [API] search board users
app.post('/api/gui/board-user', (req, res) => {

    db.serialize(() => {

        let sql = `SELECT * FROM Board_User WHERE board_id IN (${req.body.board1}, ${req.body.board2});`;

        db.all(sql, (err, rows) => {

            if (err) {
                return res.json({
                    result: false,
                    error: err,
                    rows: []
                });
            }

            return res.json({
                result: true,
                rows: rows
            });
        });
    });
});

// [API] execute SQL passed from request
app.post('/api/sql/non-select', (req, res) => {

    db.serialize(() => {

        db.run(req.body.sql, (err) => {

            if (err) {
                return res.json({
                    result: false,
                    error: err
                });
            }

            return res.json({
                result: true
            });
        });
    });
});

// [API] execute SQL passed from request
app.post('/api/sql/select', (req, res) => {

    db.serialize(() => {

        db.all(req.body.sql, (err, rows) => {

            if (err) {
                return res.json({
                    result: false,
                    error: err,
                    rows: []
                });
            }

            return res.json({
                result: true,
                rows: rows
            });
        });
    });
});

app.listen(3000, function () {
    console.log('app listening on port 3000!');
});
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();

const players = require('./routes/players');
app.use(players);  //this mounts the players router, all the route defined there are available to appjjjj

app.use(express.static('dist'));
app.use(bodyParser.json());

const db = require('./db/knex');

app.listen(8080, () => console.log('Listening on port 8080!'));

"use strict"
global.__basedir = __dirname;
let http = require('http');
let bodyParser = require('body-parser');
let express = require('express');
let sqlite = require('sqlite3').verbose();

//
const dbService = require('./services/item.service.js').create(sqlite);
const itemController = require('./controllers/item.controller.js');
const app = express();
const server = http.createServer(app);

app.use('/', express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', itemController.get(express.Router(), dbService));

server.listen(5655);

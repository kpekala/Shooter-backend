var express = require('express');
var Http = require('http');
var io = require('socket.io');

var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
const httpServer = Http.createServer(app);
const socket = io(httpServer);

app.use(cors());
app.use(bodyParser.json());

console.log("server.js is executed");

module.exports = {
    app: app,
    io: socket,
    httpServer: httpServer,
    close: () =>{
        httpServer.close();
        socket.close();
    }
};

const roomsRouter = require('./rest/routes/rooms-router');
app.use('/rooms',roomsRouter);


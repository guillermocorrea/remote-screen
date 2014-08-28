/**
 * Created by guillermo on 26/08/2014.
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express = require('express');
var config = require('./config');

var port = process.env.PORT || config.server.port;
server.listen(port);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/panel/:key', function (req, res) {
    var key = req.params.key;
    console.log(key);
    res.sendFile(__dirname + '/public/mobile.html');
});

app.get('/action/:key/:y/:action', function (req, res) {
    var key = req.params.key;
    var y = req.params.y;
    var action = req.params.action;
    sockets[key].emit('scrollTo', {y:y, action:action});
    res.send('OK');
});

var sockets = {};
io.on('connection', function (socket) {
    socket.on('setKey', function (key) {
        sockets[key] = socket;
    });
});

console.log('listening on port ' + port);
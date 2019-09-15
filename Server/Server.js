"use strict";

var DEV_MODE = false;
var PORT = 5000;

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);

    if (val == "-dev") {
        DEV_MODE = true;
    }

    if (val == "-port") {
        PORT = parseInt(process.argv[index + 1]);
    }
});

// #region Import
require('console-stamp')(console, 'HH:MM:ss.l');



const server = require('http').createServer();
const io = require('socket.io')(server);
const chalk = require('chalk');

const Client = require('./src/Client');
const Packet = require('./src/Packets/Packet');
const PacketSessionId = require('./src/Packets/PacketSessionId');
// #endregion


// Listen for incoming connections
server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(chalk.green(`Listening on port.. > ${PORT}`));
});

io.on('connection', (client) => {
    console.log(`Incoming connection.. > '${client.id}'`);

    var clientHandler = new Client({
        socket: client,
        serverio: io
    });

    //Tell client his session id
    new PacketSessionId().setData(client.id).emit(client);

    client.on(Packet.getEventName().QuickPlay, (data) => {
        if (DEV_MODE) console.log(`Raw quickplay packet data: ${data}`);
        clientHandler.onQuickPlay(JSON.parse(data));
    });

    client.on('disconnect', (data) => {
        if (clientHandler.playerExists()) clientHandler.player.connected = false;
        setTimeout(clientHandler.onDisconnect.bind(clientHandler), clientHandler.playerTimeOut * 1000);

        console.log(`Client disconnected.. > '${client.id}'`);
    });
});
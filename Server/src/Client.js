const Player = require('./Player');
const World = require('./World/World');
const chalk = require('chalk');

const PacketUniqueId = require('./Packets/PacketUniqueId');
const PacketDisconnect = require('./Packets/PacketDisconnect');
const PacketQuickPlay = require('./Packets/PacketQuickPlay');

var gameWorld = new World();

class Client {
  constructor(data) {
    this.socket = data.socket;
    this.io = data.serverio;
    this.uniqueId = Math.random().toString(36).substring(3, 16) + +new Date;

    this.player;
    this.playerTimeOut = 30; // in sec
  }

  formatUsername(username) {
    if (username.length <= 0 || username === '') {
      username = 'player_' + Math.floor(Math.random() * Math.floor(100));
    }

    // Remove illegal characters
    username = username.replace(/([^a-z0-9]+)/gi, '-');

    return username;
  }

  getFullUniqueId(uniqueId = '') {
    if (uniqueId === '')
      return `${this.uniqueId}${this.socket.handshake.address}`;
    else
      return `${uniqueId}${this.socket.handshake.address}`;
  }

  isValidUniqueId(uniqueId) {
    return (uniqueId !== "undefined");
  }

  playerExists() {
    return (this.player !== undefined);
  }

  isPlayerLoggedIn() {
    if (this.playerExists()) {
      return this.player.loggedIn;
    }
  }

  isPlayerConnected() {
    if (this.playerExists()) {
      return this.player.connected;
    }
  }

  // handle packets
  onQuickPlay(data) {
    data.username = this.formatUsername(data.username);

    if (this.playerExists())
      return;


    // if this client has a uniqueId, restore his player data
    if (this.isValidUniqueId(data.uniqueId)) {
      let fullUniqueId = this.getFullUniqueId(data.uniqueId);

      if (gameWorld.findPlayerByUid(fullUniqueId) && !this.playerExists()) {
        this.player = gameWorld.getPlayer(fullUniqueId);

        console.log(chalk.green(`Player restored.. > '${this.player.id}'`));
      }
      else
        this.uniqueId = data.uniqueId;

    }

    // create a fresh new player
    if (!this.playerExists()) {

      this.player = new Player({
        id: this.socket.id,
        uid: `${this.uniqueId}${this.socket.handshake.address}`,
        socket: this.socket,

        username: data.username,
      });

      new PacketUniqueId().setData(this.uniqueId).emit(this.socket);

      if (gameWorld.addPlayer(this.player)) {

        new PacketQuickPlay().setData(this.player).emit(this.io);

        console.log(`${this.player.username} connected.. > '${this.player.id}'`);
      }
    }

    this.player.connected = true;
  }

  onDisconnect(data) {
    if (this.isPlayerLoggedIn() && !this.isPlayerConnected()) {
      gameWorld.removePlayer(this.player);

      new PacketDisconnect().setData(this.socket.id).broadcast(this.socket);

      console.log(chalk.yellow(`Player '${this.player.username}' timed out`));
    }
  }

}


module.exports = Client;
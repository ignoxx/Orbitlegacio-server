const Packet = require('./Packet')

class PacketPosition extends Packet {
    constructor() {
        super();

        this.eventName = Packet.getEventName().Position;
        this.players;
    }

    setData(players) {
        this.players = this.formatData(players);

        return this;
    }

    formatData(players) {
        // let formatedPlayers = [];
        // for (index in players) {
        //     let player = players[index];

        //     formatedPlayers.push({
        //         id: player.id,
        //         x: player.loadout.currentShip.x,
        //         y: player.loadout.currentShip.y,
        //         dx: player.loadout.currentShip.dx,
        //         dy: player.loadout.currentShip.dy
        //     });
        // }
        
        // return formatedPlayers;

        return players;
    }
}

module.exports = PacketPosition;
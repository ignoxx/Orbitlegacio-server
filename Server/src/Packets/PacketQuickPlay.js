const Packet = require('./Packet')

class PacketQuickPlay extends Packet {
    constructor() {
        super();

        this.eventName = Packet.getEventName().QuickPlay;
        this.player;
    }

    setData(Player) {
        this.player = this.formatData(Player);

        return this;
    }

    formatData(Player) {
        return {
            id: Player.id,
            username: Player.username,
            x: Player.loadout.currentShip.x,
            y: Player.loadout.currentShip.y,
            dx: Player.loadout.currentShip.dx,
            dy: Player.loadout.currentShip.dy,
            spd: Player.loadout.currentShip.spd
        }
    }
}

module.exports = PacketQuickPlay;
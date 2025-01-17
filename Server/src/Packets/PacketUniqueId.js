const Packet = require('./Packet')

class PacketUniqueId extends Packet{    
    constructor(){
        super();

        this.eventName = Packet.getEventName().UniqueId;
        this.uniqueId;
    }

    setData(uniqueId) {
        this.uniqueId = uniqueId;

        return this;
    }
}

module.exports = PacketUniqueId;
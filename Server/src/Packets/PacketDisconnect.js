const Packet = require('./Packet')

class PacketDisconnect extends Packet{    
    constructor(){
        super();

        this.eventName = Packet.getEventName().Disconnect;
        this.sessionId;
    }

    setData(sessionId) {
        this.sessionId = sessionId;

        return this;
    }
}

module.exports = PacketDisconnect;
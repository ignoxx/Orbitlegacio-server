class Loadout {
    constructor() {
        this.ships = [];
        this.maxShips = 3;
        this.currentShip;
    }

    setCurrentShip(Ship) {
        this.currentShip = Ship;

        return this;
    }
}


module.exports = Loadout;
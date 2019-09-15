const Stats = require('./Stats/Stats');
const Loadout = require('./Ships/Loadout');
const ShipOne = require('./Ships/ShipOne')

class Player {
  constructor(data) {
    this.id = data.id; // session id
    this.uid = data.uid;
    this.username = data.username;

    this.loggedIn = false;
    this.connected = false;

    this.loadout = new Loadout().setCurrentShip(new ShipOne({
      x: 200,
      y: 200,
      spd: 8
    }));
    
    this.stats = new Stats();
    this.target;
  }

  loop(delta) {
  }

  mpLinearStep(delta) {
    let isMoving;
    let spd = this.ship.spd * delta;
    let xDiff = this.ship.dx - this.ship.x;
    let yDiff = this.ship.dy - this.ship.y;
    let angle = Math.atan2(yDiff, xDiff);

    if ((spd * spd) >= (xDiff * xDiff) + (yDiff * yDiff)) {
      this.ship.x = this.ship.dx;
      this.ship.y = this.ship.dy;

      isMoving = false;
    }
    else {
      this.ship.x += spd * Math.cos(angle);
      this.ship.y += spd * Math.sin(angle);

      isMoving = true;
    }

    return isMoving;
  }
}


module.exports = Player;
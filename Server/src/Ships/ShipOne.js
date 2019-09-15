const Ship = require('./Ship');

class ShipOne extends Ship {
  constructor(initData) {
    super();

    this.spd = initData.spd;
    this.x = initData.x;
    this.y = initData.y;
    this.dx = this.x;
    this.dy = this.y;   
  }
}


module.exports = ShipOne;
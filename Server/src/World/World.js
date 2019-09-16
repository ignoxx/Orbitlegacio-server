const GameLoop = require('node-gameloop');
const chalk = require('chalk');

class World {
    constructor() {
        this.maxPlayers = 64;
        this.gameSpeed = 60;

        this.team = {
            a: null,
            b: null,
            c: null
        }

        this.players = {};
        this.bases = [];
        this.asteroids = [];

        this.playerMaxRange = 2000;

        this.gameLoopId = GameLoop.setGameLoop(this.gameLoop.bind(this), 1000 / this.gameSpeed);
        this.updateLoopId = GameLoop.setGameLoop(this.updateLoop.bind(this), 45);

        console.log(chalk.green(`World created.. > MaxPlayers: ${this.maxPlayers}`));
    }

    gameLoop(delta) {
        // Player loop
        Object.entries(this.players).forEach(([key, player]) => {
            if (player.loggedIn) player.loop(delta);
        });
    }

    updateLoop(delta) {
        // Update positions of near players
        Object.entries(this.players).forEach(([key, player]) => {
            if (player.loggedIn) {
                let playersInRange = this.getPlayersInRange(player);

            }
        });
    }

    getPlayersInRange(sourcePlayer) {
        let playersInRange = [];
        Object.entries(this.players).forEach(([key, player]) => {
            if (player.loggedIn && player != sourcePlayer) {
                let x1 = sourcePlayer.x;
                let y1 = sourcePlayer.y;
                let x2 = player.x;
                let y2 = player.y;

                if (Math.hypot(x2 - x1, y2 - y1) <= this.playerMaxRange) {
                    playersInRange.push(player);
                }
            }
        });

        return playersInRange;
    }

    addPlayer(Player) {
        if (this.players.length >= this.maxPlayer)
            return false;

        this.players[Player.uid] = Player;
        Player.loggedIn = true;

        console.log(chalk.yellow(`Players online ${Object.keys(this.players).length}/${this.maxPlayers}`));

        return true;
    }

    findPlayerByUid(uniqueId) {
        return (uniqueId in this.players);
    }

    getPlayer(uniqueId) {
        return this.players[uniqueId];
    }

    getPlayerDict() {
        return JSON.stringify(this.players);
    }

    removePlayer(Player) {
        Player.loggedIn = false;
        delete this.players[Player.uid];

        console.log(chalk.yellow(`Players online ${Object.keys(this.players).length}/${this.maxPlayers}`));
    }
}

module.exports = World;
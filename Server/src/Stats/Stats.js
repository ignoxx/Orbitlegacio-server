class Stats {
    constructor() {
        this.asteroidKills;
        this.npcKills;
        this.playerKills;
        this.deaths;
        this.ressCollected;
        this.baseCaptures;
        this.xp;
        this.level;
    }

    updateXp(xp) {
        this.xp = xp;

        // update level here
        // ..
    }
}


module.exports = Stats;
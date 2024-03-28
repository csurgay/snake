class Color {
    constructor() {
        this.CANVAS="pink";
        this.INK="red";
        this.FOOD="cyan";
        this.EYE="white";
        this.PUPIL="black";
    }
}

function keyupevent(e) {
    games.forEach(g=>g.keyupevent(e));
}

function rand(n) {
    return Math.floor(n*Math.random());
}

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

function mouseupevent(e) {
    var i=control.clicked(e.clientX,e.clientY);
    if (i!=-1) {
        games.forEach(g=>g.keyupevent({ keyCode:i }));
    }
}

function touchstart(e) {
    var t=e.changedTouches[0];
    var i=control.clicked(t.pageX,t.pageY);
    if (i!=-1) {
        games.forEach(g=>g.keyupevent({ keyCode:i }));
    }
}

function rand(n) {
    return Math.floor(n*Math.random());
}

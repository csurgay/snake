const canvas=document.getElementById("boricanvas");
const ctx=canvas.getContext("2d");
var ww=window.innerWidth, wh=window.innerHeight;
addEventListener('keyup', keyupevent);

var ms, tLastStep=0, tStepDelay=200;

const games=[];
const color=new Color();
games.push(new Game(20,20,15,22,30));
games.push(new Game(500,20,15,15,25));
games.push(new Game(500,420,17,12,20));

animate();

function animate() {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ms=Date.now();
    games.forEach(g=>g.draw());
    if (ms>tLastStep+tStepDelay) {
        games.forEach(g=>g.step());
        tLastStep=ms;
    }
    if (games[0].running) requestAnimationFrame(animate);
}

function rand(n) {
    return Math.floor(n*Math.random());
}

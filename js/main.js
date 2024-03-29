const canvas=document.getElementById("boricanvas");
const ctx=canvas.getContext("2d");
addEventListener('keyup', keyupevent);

var ms, tLastStep=0, tStepDelay=200;

const games=[];
const color=new Color();
games.push(new Game(10,10,9,12,54));
games.push(new Game(510,10,15,15,25));
games.push(new Game(510,410,30,20,12));
games.push(new Game(100,100,6,4,100,1,3));

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

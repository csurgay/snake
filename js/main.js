const canvas=document.getElementById("boricanvas");
const ctx=canvas.getContext("2d");

var ms, tLastStep=0, tStepDelay=20, stepCount=10;

const games=[];
const color=new Color();
//games.push(new Game(10,10,9,12,54,1));
//games.push(new Game(510,10,15,15,25,2));
//games.push(new Game(510,410,30,20,12,5));
games.push(new Game(0,0,10,10,75,1));

const control=new Control(450,800);
const events=new Events();
addEventListener('keydown', keyupevent);
addEventListener('mouseup', mouseupevent);
addEventListener("touchstart", touchstart);

const images=new Images(4);
images.addImage("afonya","afonya.png");
images.addImage("cseresznye","cseresznye.png");
images.addImage("eper","eper.png");
images.addImage("ananasz","ananasz.png");

function animate() {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ms=Date.now();
    games.forEach(g=>g.draw());
    control.draw();
    if (ms>tLastStep+tStepDelay) {
        games.forEach(g=>g.microstep());
        tLastStep=ms;
    }
    if (games[0].running) requestAnimationFrame(animate);
}

function rand(n) {
    return Math.floor(n*Math.random());
}

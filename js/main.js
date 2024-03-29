const canvas=document.getElementById("boricanvas");
const ctx=canvas.getContext("2d");
addEventListener('keyup', keyupevent);

var ms, tLastStep=0, tStepDelay=20, stepCount=10;

const games=[];
const color=new Color();
games.push(new Game(10,10,9,12,54,1));
games.push(new Game(510,10,15,15,25,2));
games.push(new Game(510,410,30,20,12,5));
//games.push(new Game(100,100,6,4,100,1));

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
    if (ms>tLastStep+tStepDelay) {
        games.forEach(g=>g.microstep());
        tLastStep=ms;
    }
    if (games[0].running) requestAnimationFrame(animate);
}

function rand(n) {
    return Math.floor(n*Math.random());
}

const COLOR_CANVAS="pink";
const COLOR_INK="red";
const COLOR_FOOD="cyan";
const COLOR_EYE="white";
const COLOR_PUPIL="black";
const canvas=document.getElementById("boricanvas");
const ctx=canvas.getContext("2d");
var ww=window.innerWidth, wh=window.innerHeight;
addEventListener('keyup', keyupevent);
console.log("Start");

function keyupevent(e) {
    game.keyupevent(e);
}

class Game {
    constructor(x,y,bx,by,bd) {
        this.x=x;
        this.y=y;
        this.bx=bx;
        this.by=by;
        this.bd=bd;
        this.board=new Board(x,y,bx,by,bd);
        this.food=new Food(this.board,100);
        this.snake=new Snake(this.board,this.food,3,5,5,1,0);
    }
    draw() {
        this.board.draw();
        this.food.draw();
        this.snake.draw();
    }
    keyupevent(e) {
        if (e.keyCode==38) { this.snake.dx=0; this.snake.dy=-1; }
        if (e.keyCode==40) { this.snake.dx=0; this.snake.dy=1; }
        if (e.keyCode==37) { this.snake.dx=-1; this.snake.dy=0; }
        if (e.keyCode==39) { this.snake.dx=1; this.snake.dy=0; }
    }
    step() {
        this.snake.step();
        this.snake.checkFood();
        if (this.snake.checkDeath()) {
            alert("Szegényke magába harapott...!");
        }
    }
}

class Board {
    constructor(x,y,bx,by,bd) {
        this.x=x;
        this.y=y;
        this.bx=bx;
        this.by=by;
        this.bd=bd;
        this.b=[];
        this.init();
    }
    init() {
        for (let i=0; i<this.by; i++) {
            this.b.push([]);
            for (let j=0; j<this.bx; j++) {
                this.b[i].push(' ');
            }
        }
    }
    draw() {
        ctx.fillStyle = COLOR_CANVAS;
        ctx.fillRect(this.x, this.y, 
            this.bx*this.bd, this.by*this.bd);
        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.strokeStyle = COLOR_INK;
        ctx.lineWidth=1;
        for (let i=0; i<=this.bx; i++) {
            ctx.moveTo(this.x,this.y+i*this.bd);
            ctx.lineTo(this.x+this.bx*this.bd,this.y+i*this.bd);
            ctx.moveTo(this.x+i*this.bd,this.y);
            ctx.lineTo(this.x+i*this.bd,this.y+this.by*this.bd);
        }
        ctx.stroke();
    }
}

class Food {
    constructor(board,nFood) {
        this.nFood=nFood;
        this.board=board;
        this.init();
    }
    init() {
        for (var i=0; i<this.nFood; i++) {
            this.addOneFood();
        }
    }
    addOneFood() {
        var nf; //newfood
        do {
            nf=[Math.floor(this.board.bx*Math.random()),
                Math.floor(this.board.by*Math.random())];
        } while (this.board.b[nf[1]][nf[0]] != " ");
        this.board.b[nf[1]][nf[0]] = "F"
    }
    draw() {
        ctx.fillStyle = COLOR_FOOD;
        for (var i=0; i<this.board.by; i++) {
            for (var j=0; j<this.board.bx; j++) {
                if (this.board.b[i][j]=="F")
                ctx.fillRect(this.board.x+j*this.board.bd+7, 
                this.board.y+i*this.board.bd+7, 
                this.board.bd-14, this.board.bd-14);
            }
        }
    }
}

class Snake {
    constructor(board,food,l,x,y,dx,dy) {
        this.s=[];
        this.board=board;
        this.food=food;
        this.dx=dx;
        this.dy=dy;
        this.enlarge=false;
        this.init(l,x,y,dx,dy);
    }
    init(l,x,y,dx,dy) {
        for (let i=0; i<l; i++) {
            this.s.push([x,y]);
            x-=dx;
            y-=dy;
        }
    }
    draw() {
        // Draw the snake
        ctx.fillStyle = COLOR_INK;
        for (var i=0; i<this.s.length; i++) {
            ctx.fillRect(this.board.x+this.s[i][0]*this.board.bd+2, 
                this.board.y+this.s[i][1]*this.board.bd+2, 
                this.board.bd-4, this.board.bd-4);
        }
        // Draw the eyes
        var de=6;
        ctx.beginPath();
        ctx.fillStyle=COLOR_EYE;
        var x=this.s[0][0], y=this.s[0][1];
        x=this.board.x+x*this.board.bd+this.board.bd/2;
        y=this.board.y+y*this.board.bd+this.board.bd/2;
        ctx.arc(x-de*this.dy,y-de*this.dx,4,0,2*Math.PI);
        ctx.arc(x+de*this.dy,y+de*this.dx,4,0,2*Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle=COLOR_PUPIL;
        ctx.arc(x-de*this.dy,y-de*this.dx,2,0,2*Math.PI);
        ctx.arc(x+de*this.dy,y+de*this.dx,2,0,2*Math.PI);
        ctx.fill();
    }
    step() {
        var lastX=this.s[this.s.length-1][0];
        var lastY=this.s[this.s.length-1][1];
        for (var i=this.s.length-1; i>0; i--) {
            this.s[i][0]=this.s[i-1][0];
            this.s[i][1]=this.s[i-1][1];
        }
        this.s[0][0]+=this.dx;
        if (this.s[0][0]==this.board.bx) this.s[0][0]=0;
        if (this.s[0][0]==-1) this.s[0][0]=this.board.bx-1;
        this.s[0][1]+=this.dy;
        if (this.s[0][1]==this.board.by) this.s[0][1]=0;
        if (this.s[0][1]==-1) this.s[0][1]=this.board.by-1;
        if (this.enlarge) {
            this.s.push([lastX,lastY]);
            this.enlarge=false;
        }
    }
    checkFood() {
        if (this.board.b[this.s[0][1]][this.s[0][0]] == "F") {
            this.board.b[this.s[0][1]][this.s[0][0]] = " ";
            this.food.addOneFood();
            this.enlarge=true;
        }
    }
    checkSnake(pos,begin) {
        for (var i=begin; i<this.s.length; i++) {
            if (pos[0]==this.s[i][0] && pos[1]==this.s[i][1]) {
                return true;
            }
        }
        return false;
    }
    checkDeath() {
        return this.checkSnake(this.s[0],1);
    }
}

var ms, tLastStep=0, tStepDelay=200;

const game=new Game(20,20,20,20,30);

function animate() {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ms=Date.now();
    game.draw();
    if (ms>tLastStep+tStepDelay) {
        game.step();
        tLastStep=ms;
    }
    requestAnimationFrame(animate);
}

animate();

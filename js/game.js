class Game {
    constructor(x,y,bx,by,bd,l=3) {
        this.x=x;
        this.y=y;
        this.bx=bx;
        this.by=by;
        this.bd=bd;
        this.board=new Board(x,y,bx,by,bd);
        this.food=new Food(this.board,Math.ceil(bx*by/100));
        this.snake=new Snake(this.board,this.food,l);
        this.running=true;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.bd*this.bx+1,this.bd*this.by+1);
        ctx.clip();
        this.board.draw();
        this.food.draw();
        this.snake.draw();
        ctx.restore();
    }
    keyupevent(e) {
        if (e==32) { this.running=!this.running; if (this.running) animate(); }
        if (e==38) { this.snake.dx=0; this.snake.dy=-1; }
        if (e==40) { this.snake.dx=0; this.snake.dy=1; }
        if (e==37) { this.snake.dx=-1; this.snake.dy=0; }
        if (e==39) { this.snake.dx=1; this.snake.dy=0; }
    }
    step() {
        this.snake.step();
        this.snake.checkFood();
        if (this.snake.checkDeath()) {
            alert("Szegényke magába harapott...!");
        }
    }
    microstep() {
        this.snake.mstep++;
        if (this.snake.mstep==stepCount) {
            this.step();
            this.snake.mstep=0;
            events.processOneEvent();
        }
    }
}

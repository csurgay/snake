class Game {
    constructor(x,y,bx,by,bd) {
        this.x=x;
        this.y=y;
        this.bx=bx;
        this.by=by;
        this.bd=bd;
        this.board=new Board(x,y,bx,by,bd);
        this.food=new Food(this.board,7);
        this.snake=new Snake(this.board,this.food);
        this.running=true;
    }
    draw() {
        this.board.draw();
        this.food.draw();
        this.snake.draw();
    }
    keyupevent(e) {
        if (e.keyCode==32) { this.running=!this.running; if (this.running) animate(); }
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

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
            nf=[rand(this.board.bx),
                rand(this.board.by)];
        } while (this.board.b[nf[1]][nf[0]] != " ");
        this.board.b[nf[1]][nf[0]] = ""+rand(4);
    }
    draw() {
        ctx.fillStyle = color.FOOD;
        var m=this.board.bd/5;
        for (var i=0; i<this.board.by; i++) {
            for (var j=0; j<this.board.bx; j++) {
                var r=this.board.b[i][j];
                if (r!=" ") {
                    ctx.drawImage(images.i[parseInt(r)],
                    this.board.x+j*this.board.bd, 
                    this.board.y+i*this.board.bd, 
                    this.board.bd, this.board.bd);
                }
            }
        }
    }
}

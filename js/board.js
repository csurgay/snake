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
        ctx.fillStyle = color.CANVAS;
        ctx.fillRect(this.x, this.y, 
            this.bx*this.bd, this.by*this.bd);
        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.strokeStyle = color.INK;
        ctx.lineWidth=1;
        for (let i=0; i<=this.by; i++) {
            ctx.moveTo(this.x,this.y+i*this.bd);
            ctx.lineTo(this.x+this.bx*this.bd,this.y+i*this.bd);
        }
        for (let i=0; i<=this.bx; i++) {
            ctx.moveTo(this.x+i*this.bd,this.y);
            ctx.lineTo(this.x+i*this.bd,this.y+this.by*this.bd);
        }
        ctx.stroke();
    }
}

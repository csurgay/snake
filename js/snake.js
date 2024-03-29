class Snake {
    constructor(board,food,len) {
        this.s=[];
        this.board=board;
        this.food=food;
        this.dx=rand(3)-1;
        this.dy=this.dx==0?2*rand(2)-1:0;
        this.enlarge=false;
        this.mstep=0;
        this.init(1+rand(len),rand(this.board.bx),
            rand(this.board.by),this.dx,this.dy);
    }
    init(l,x,y,dx,dy) {
        for (let i=0; i<l; i++) {
            this.s.push([x,y]);
            x-=dx;
            if (x==this.board.bx) x=0;
            if (x==-1) x=this.board.bx-1;
            y-=dy;
            if (y==this.board.by) y=0;
            if (y==-1) y=this.board.by-1;
        }
    }
    draw() {
        var delta=Math.floor(this.mstep*this.board.bd/stepCount);
        this.drawHead(delta,
            this.s[0][0],
            this.s[0][1]
        );
        this.drawHead(delta,
            this.s[0][0]-this.dx*this.board.bx,
            this.s[0][1]-this.dy*this.board.by
        );
        this.drawBody();
        this.drawEyes(delta,
            this.s[0][0],
            this.s[0][1]
        );
        this.drawEyes(delta,
            this.s[0][0]-this.dx*this.board.bx,
            this.s[0][1]-this.dy*this.board.by
        );
    }
    drawHead(delta,x,y) {
        ctx.fillStyle = color.INK;
        var ax=this.board.x+x*this.board.bd+2;
        var ay=this.board.y+y*this.board.bd+2;
        var adx=this.board.bd-4;
        var ady=this.board.bd-4;
        if (this.dx<0) ax+=delta*this.dx;
        if (this.dy<0) ay+=delta*this.dy;
        adx+=delta*Math.abs(this.dx);
        ady+=delta*Math.abs(this.dy);
        ctx.fillRect(ax,ay,adx,ady);
    }
    drawBody() {
        ctx.fillStyle = color.INK;
        for (var i=0; i<this.s.length; i++) {
            var ax=this.board.x+this.s[i][0]*this.board.bd+2;
            var ay=this.board.y+this.s[i][1]*this.board.bd+2;
            var adx=this.board.bd-4;
            var ady=this.board.bd-4;
            ctx.fillRect(ax,ay,adx,ady);
        }
    }
    drawEyes(delta,x,y) {
        var bd=this.board.bd, de=bd*7/30, be=bd*7/30, r1=bd*6/30, r2=bd*4/30;
        ctx.beginPath();
        ctx.fillStyle=color.EYE;
        x=delta*this.dx+this.board.x+x*this.board.bd+this.board.bd/2;
        y=delta*this.dy+this.board.y+y*this.board.bd+this.board.bd/2;
        ctx.arc(x-de*this.dy+be*this.dx,
            y-de*this.dx+be*this.dy,r1,0,2*Math.PI);
        ctx.arc(x+de*this.dy+be*this.dx,
            y+de*this.dx+be*this.dy,r1,0,2*Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle=color.PUPIL;
        ctx.arc(x-de*this.dy+be*this.dx,
            y-de*this.dx+be*this.dy,r2,0,2*Math.PI);
        ctx.arc(x+de*this.dy+be*this.dx,
            y+de*this.dx+be*this.dy,r2,0,2*Math.PI);
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
        if (this.board.b[this.s[0][1]][this.s[0][0]] != " ") {
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

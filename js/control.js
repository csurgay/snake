class Control {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.arrow=[[20,30],[-10,0],[0,30],[-20,0],
            [0,-30],[-10,0],[20,-30]
        ];
        this.spots=[[this.x+100,this.y,0,-1],
            [this.x,this.y+100,-1,0],
            [this.x-100,this.y,0,1],
            [this.x,this.y-100,1,0]
        ];
        this.dirs=[[0,-1,39],[-1,0,40],[0,1,37],[1,0,38]];
    }
    draw() {
        for (let i=0; i<4; i++) {
            this.drawArrow(this.spots[i][0],this.spots[i][1],
                this.dirs[i][0],this.dirs[i][1]);
        }
    }
    drawArrow(x,y,dx,dy) {
        ctx.strokeStyle=color.INK;
        ctx.beginPath();
        ctx.moveTo(x+70,y);
        ctx.arc(x,y,70,0,2*Math.PI);
        ctx.moveTo(x,y);
        this.arrow.forEach(a=>{
            x+=dx*a[0]+dy*a[1];
            y+=dy*a[0]+dx*a[1];
            ctx.lineTo(x,y);
        });
        ctx.stroke();
    }
    clicked(x,y) {
        var mini=-1, d=60;
        this.spots.forEach(function callback(v,i) {
            if(Math.hypot(v[0]-x,v[1]-y)<d) {
                d=Math.hypot(v[0]-x,v[1]-y);
                mini=i;
            }
        });
        if (mini==-1) return -1;
        else return this.dirs[mini][2];
    }
}
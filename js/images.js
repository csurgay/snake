class Images {
    constructor(no) {
        this.no=no;
        this.i=[];
        this.n=[];
    }
    addImage(name,src) {
        this.n.push(name);
        var img=new Image(100,100);
        this.i.push(img);
        img.onload=this.loaded();
        img.src="images/"+src;
    }
    loaded() {
        this.no--;
        if (this.no==0) animate();
    }
}
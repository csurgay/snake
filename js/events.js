class Events {
    constructor() {
        this.e=[];
    }
    processOneEvent() {
        if (this.e.length>0) {
            var evt=this.e.shift();
            if (evt!=-1) {
                games.forEach(g=>{
                    g.keyupevent(evt);
                })
            }
        }
    }
}
function keyupevent(evt) {
    events.e.push(evt.keyCode);
}
function mouseupevent(evt) {
    events.e.push(control.clicked(evt.clientX,evt.clientY));
}
function touchstart(evt) {
    var t=evt.changedTouches[0];
    events.e.push(control.clicked(t.pageX,t.pageY));
}

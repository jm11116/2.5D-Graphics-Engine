class Raycaster {
    constructor(){
        this.cast(0);
    }
    cast(angle){
        var angle = angle + 270;
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        var x1 = 80;
        var y1 = 80;
        var length = $(window).height();
        var x2 = x1 + Math.cos(Math.PI * angle / 180) * length;
        var y2 = y1 + Math.sin(Math.PI * angle / 180) * length;
        context.strokeStyle = "#FF0000";
        context.beginPath();
        context.moveTo(x2, y2);
        context.lineTo(x1, y1);
        context.stroke();
    }
}

var raycaster = new Raycaster();
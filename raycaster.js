class Raycaster {
    constructor(){
        this.cast(0);
    }
    cast(angle){
        //Divide FOV by number of columns then use that to offset angle of each ray (ray0 = 0deg, ray1 = 4deg, ray2 = 8deg, etc)
        console.log(this.getRayTestCoords(angle));
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
    getRayTestCoords(angle){
        var coordinates = [];
        for (var i = 1; i <= 5; i++){
            //var angle = angle + 270;
            var x1 = 80;
            var y1 = 80;
            var length = i * 10;
            var x2 = x1 + Math.cos(Math.PI * angle / 180) * length;
            var y2 = y1 + Math.sin(Math.PI * angle / 180) * length;
            //this.getCellType(x2, y2);
            coordinates.push(parseFloat(x2.toFixed(2)));
            //return [x2, y2];
        }
        return coordinates; //Current returns one coordinate alone the ray
    }
    /*getCellType(x, y){

    }*/
}

var raycaster = new Raycaster();
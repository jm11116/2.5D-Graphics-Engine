class Raycaster {
    constructor(){
        this.fov = 60;
    }
    getRayTestCoords(angle){
        var angle = angle - 90;
        var coordinates = [];
        for (var i = 1; i <= 10; i++){
            var x1 = $("#player").position().left;
            var y1 = $("#player").position().top;
            var length = i * 50;
            var x2 = x1 + Math.cos(Math.PI * angle / 180) * length;
            var y2 = y1 + Math.sin(Math.PI * angle / 180) * length;
            coordinates.push(parseInt(x2));
            coordinates.push(parseInt(y2));
        }
        this.findWall(coordinates);
        return coordinates;
    }
    findWall(coordinates){
        coordinates.forEach((coordinate, i) => {
            if (i % 2 === 0){
                try {
                    var element = document.elementFromPoint(coordinates[i], coordinates[i + 1]).id;
                } catch {
                    return; //Prevents console throwing errors for non-existent elems out of bounds
                } finally {
                    if (element != null && element.includes("wall")){
                        console.log(element);
                        //this.getDistanceToWall(element);
                    }
                }
            }
        });
    }
    getDistanceToWall(wall_id){
        var player_x = $("#player").position().left;
        var player_y = $("#player").position().top;
        var wall_x = $("#" + wall_id).position().left;
        var wall_y = $("#" + wall_id).position().top;
    }
    drawCoordinates(coordinates){
        var coordinates = coordinates; //Array
        $(".coordinate_marker").remove();
        coordinates.forEach((coordinate, i) => {
            if (i % 2 === 0){
                var dot = document.createElement("div");
                dot.classList.add("coordinate_marker");
                dot.style.left = coordinates[i] + "px";
                dot.style.top =  coordinates[i + 1] + "px";
                document.body.appendChild(dot);
            }
        });
    }
}

var raycaster = new Raycaster();
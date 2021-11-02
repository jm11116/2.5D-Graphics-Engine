class Raycaster {
    constructor(){
        this.distances = [];
    }
    getAllDistances(angle){
        this.distances = [];
        var angle_start = (angle - 90) - 30; //60 columns, so start casting from (current_angle - 30)
        for (var i = 0; i < projector.columns; i++){
            this.getRayTestCoords(angle_start);
            angle_start++;
        }
        projector.render(this.distances);
        console.log(this.distances);
    }
    getRayTestCoords(angle){
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
        //this.drawCoordinates(coordinates);
        this.findWall(coordinates);
    }
    findWall(coordinates){
        var found = false;
        coordinates.forEach((coordinate, i) => {
            if (i % 2 === 0 && found === false){
                try {
                    var element = document.elementFromPoint(coordinates[i], coordinates[i + 1]).id;
                } catch {
                    return; //Prevents console throwing errors for non-existent elems out of bounds
                } finally {
                    if (element != null && element.includes("wall")){
                        found = true;
                        this.getDistanceToWall(element);
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
        let y = wall_x - player_x;
        let x = wall_y - player_y;
        var distance = Math.sqrt(x * x + y * y);
        this.distances.push((distance / 10));
        //console.log(wall_id + " is " + distance + " pixels away from player");
        //This function only returns difference between top left corners. Fix.
    }
    drawCoordinates(coordinates){
        var coordinates = coordinates; //Array
        $(".coordinate_marker").remove();
        coordinates.forEach((coordinate, i) => {
            if (i % 2 === 0){
                var dot = document.createElement("div");
                dot.classList.add("coordinate_marker");
                dot.style.left = coordinates[i] + "px";
                dot.style.top = coordinates[i + 1] + "px";
                document.body.appendChild(dot);
            }
        });
    }
}

var raycaster = new Raycaster();
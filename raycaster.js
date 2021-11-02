class Raycaster {
    constructor(){
        this.distances = [];
        this.fov = 60;
        this.half_fov = this.fov / 2;
    }
    getAllDistances(angle){
        this.distances = [];
        var angle_start = (angle - 90) - (projector.columns / 2); //60 columns, so start casting from (current_angle - 30). Should we base this on this.columns?
        for (var i = 0; i < projector.columns; i++){
            this.getRayTestCoords(angle_start);
            angle_start++;
        }
        projector.render(this.distances);
    }
    getRayTestCoords(angle){
        var coordinates = [];
        for (var i = 0; i <= engine.draw_distance; i++){
            var x1 = $("#player").position().left;
            var y1 = $("#player").position().top;
            var length = i * engine.scale_factor / 2;
            var x2 = x1 + Math.cos(Math.PI * angle / 180) * length;
            var y2 = y1 + Math.sin(Math.PI * angle / 180) * length;
            coordinates.push(parseInt(x2));
            coordinates.push(parseInt(y2));
        }
        this.findWall(coordinates);
    }
    findWall(coordinates){
        var found = false; //True when wall found so doesn't return walls behind walls
        coordinates.forEach((coordinate, i) => {
            if (i % 2 === 0 && found === false){
                try {
                    var element = document.elementFromPoint(coordinates[i], coordinates[i + 1]).id;
                } catch {
                    this.distances.push(null, null); //Prevents console throwing errors for non-existent elems out of bounds and pushes a blank column if wall can't be found
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
        var y = wall_x - player_x;
        var x = wall_y - player_y;
        var distance = Math.sqrt(x * x + y * y);
        if (distance <= 0){
            distance = 0;
        }
        this.distances.push(100 - (distance / 4)); //Convert float to one that's inversely proportionate
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
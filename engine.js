class Engine {
    constructor(){
        this.map = this.getRoomData();
        this.map_width = 16;
        this.draw_distance = 26;
        this.scale_factor = window.innerHeight / 28; //Smaller = bigger
        this.anim_interval;
        this.rotate_interval;
        this.animating = false;
        this.reverse_rotation = 360;
        this.reverse_rotation_speed = 5;
        this.reverse_rotate_int;
        this.wall_ids = [];
        this.automap = false;
        this.stats = false;
        this.color = false;
        this.validateMapData();
        this.draw2DMap();
        this.bindings();
    }
    getRoomData(){
        var string;
        $.ajax({
            url: "room_data2.js",
            async: false,
            context: this,
            error: function(xhr){
                console.log(xhr.status);
            },
            success: function(json){
                string = json;
            }
        });
        return JSON.parse("[" + string + "]");
    }
    validateMapData(){
        if (!this.map.includes("x")){
            alert("Player location not specified in map data.");
        }
        var occurences = [];
        this.map.forEach((element) => {
            if (element === "x"){
                occurences.push(element);
            }
        });
        if (occurences.length > 1){
            alert("Cannot specify more than one player in map data.");
        }
    }
    draw2DMap(){
        var current_column = 0;
        var current_row = 0;
        this.map.forEach((type, i) => {
            var tile = document.createElement("div");
            tile.style.width = this.scale_factor + "px";
            tile.style.height = this.scale_factor + "px"
            if (i % this.map_width === 0 && i != 0){
                current_column = 0;
                current_row = current_row + this.scale_factor;
            } else if (i != 0) {
                current_column = current_column + this.scale_factor;
            }
            tile.style.left = current_column + "px";
            tile.style.top = current_row + "px";
            tile.classList.add("tile");
            if (type === "#"){
                tile.classList.add("wall_tile");
                var wall_id = "wall" + i;
                this.wall_ids.push(wall_id);
                tile.id = wall_id;
            } else if (type === "."){
                tile.classList.add("floor_tile");
                tile.id = "floor" + i;
            } else if (type === "x"){
                tile.classList.add("player");
                tile.id = "player";
            }
            document.getElementById("map").appendChild(tile);
        });
    }
    animatePlayer(direction, speed){
        var player = document.getElementById("player");
        this.anim_interval = setInterval(() => {
            var rotation = this.getRotation(player);
            var player_top = parseInt(player.style.top);
            var player_left = parseInt(player.style.left);
            switch (direction){
                case "up":
                    if (rotation <= 360 && rotation > 270){
                        var offset = Math.abs(rotation - 360) / 10; //abs converts negative to positive
                        player.style.top = (player_top - 2) + "px";
                        player.style.left = (player_left - offset) + "px";
                    } else if (rotation <= 270 && rotation >= 180){
                        var offset = Math.abs((this.reverse_rotation - 180) / 10);
                        player.style.top = (player_top + 2) + "px";
                        player.style.left = (player_left - offset) + "px";
                    } else if (rotation < 180 && rotation >= 90){
                        var offset = (this.reverse_rotation - 180) / 10;
                        player.style.top = (player_top + 2) + "px";
                        player.style.left = (player_left + offset) + "px";
                    } else if (rotation <= 90){
                        var offset = rotation / 10;
                        player.style.top = (player_top - 2) + "px";
                        player.style.left = (player_left + offset) + "px";
                    }
                    break;
                }
                raycaster.getAllDistances(rotation);
                stats.refresh();
        }, speed);
    }
    getRotation(element){
        var style = window.getComputedStyle(element, null);
        var transform = style.getPropertyValue("transform");
        if (transform != "none") {
            var values = transform.split("(")[1].split(")")[0].split(",");
            var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
            return (angle < 0 ? angle + 360 : angle);
        }
        return 0;
    }
    rotatePlayer(direction, speed){
        this.reverse_rotate_int = setInterval(() => {
            if (this.reverse_rotation > 360){
                this.reverse_rotation = 0;
            } else if (this.reverse_rotation < 0){
                this.reverse_rotation = 360;
            }
        }, 1);
        var player = document.getElementById("player");
        if (direction === "counter"){
            this.rotate_interval = setInterval(() => {
                player.style.transform = "rotate(" + 
                    (this.getRotation(player) - this.reverse_rotation_speed) + "deg)";
                this.reverse_rotation = this.reverse_rotation + this.reverse_rotation_speed;
                raycaster.getAllDistances(this.getRotation(player));
            }, speed);
        } else if (direction === "clock"){
            this.rotate_interval = setInterval(() => {
                player.style.transform = "rotate(" + 
                    (this.getRotation(player) + this.reverse_rotation_speed) + "deg)";
                this.reverse_rotation = this.reverse_rotation - this.reverse_rotation_speed;
                raycaster.getAllDistances(this.getRotation(player));
            }, speed);
        }
    }
    bindings(){
        document.addEventListener("keydown", (e) => {
            //this.boundsCollision();
            var code = e.which || e.key;
            if (code == 32 && this.automap === false){ // tilde to toggle automap
                $(".tile").css("opacity", "1");
                this.automap = true;
            } else if (code == 32 && this.automap === true){ //32 = space
                $(".tile").css("opacity", "0");
                this.automap = false;
            } else if (code == 83 && this.stats === false){
                $("#stats").hide();
                this.stats = true;
            } else if (code == 83 && this.stats === true){
                $("#stats").show();
                this.stats = false;
            } else if (code == 221){ //Closing square bracket
                projector.changeColumnSize("bigger");
            } else if (code == 219){ //Opening square bracket
                projector.changeColumnSize("smaller");
            } else if (code == 67 && this.color === false){ //c letter key
                $(".column").addClass("colored_column");
                $("#sky").addClass("colored_sky");
                $("#floor").addClass("colored_floor");
                this.color = true;
            } else if (code == 67 && this.color === true){
                $(".column").removeClass("colored_column");
                $("#sky").removeClass("colored_sky");
                $("#floor").removeClass("colored_floor");
                this.color = false;               
            }
            if (this.animating === false){
                this.animating = true;
                switch (code) {
                    case 38:
                        this.animatePlayer("up", 2);
                        break;
                    case 40:
                        this.animatePlayer("down", 2);
                        break;
                    case 37:
                        this.rotatePlayer("counter", 1);
                        break;
                    case 39:
                        this.rotatePlayer("clock", 1);
                        break;
                }
            }
        });
        document.addEventListener("keyup", (e) => {
            clearInterval(this.anim_interval);
            clearInterval(this.rotate_interval);
            clearInterval(this.reverse_rotate_int);
            clearInterval(collision.collision_loop);
            this.animating = false;
        });
    }
}

var engine = new Engine();
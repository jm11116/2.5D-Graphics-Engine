class Engine {
    constructor(){
        this.map = this.getRoomData();
        this.map_width = 16;
        this.scale_factor = window.innerHeight / 13; //Smaller = bigger
        this.anim_interval;
        this.rotate_interval;
        this.animating = false;
        this.reverse_rotation = 360;
        this.reverse_rotate_int;
        this.wall_ids = [];
        this.validateMapData();
        this.draw2DMap();
        this.bindKeyboard();
    }
    getRoomData(){
        var string;
        $.ajax({
            url: "room_data.js",
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
                var wall_id = "wall" + Math.floor(Math.random() * 9999);
                this.wall_ids.push(wall_id);
                tile.id = wall_id;
            } else if (type === "."){
                tile.classList.add("floor_tile");
            } else if (type === "x"){
                tile.classList.add("player");
                tile.id = "player";
            }
            document.getElementById("container").appendChild(tile);
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
                        var offset = Math.abs(rotation - 360) / 10; //Left offsets between 0 - 9px based on player rotation
                        player.style.top = (player_top - speed) + "px";
                        player.style.left = (player_left - offset) + "px";
                    } else if (rotation <= 270 && rotation >= 180){
                        var offset = Math.abs((this.reverse_rotation - 180) / 10);
                        player.style.top = (player_top + speed) + "px";
                        player.style.left = (player_left - offset) + "px";
                    } else if (rotation < 180 && rotation >= 90){
                        var offset = (this.reverse_rotation - 180) / 10;
                        player.style.top = (player_top + speed) + "px";
                        player.style.left = (player_left + offset) + "px";
                    } else if (rotation <= 90){
                        var offset = rotation / 10;
                        player.style.top = (player_top - speed) + "px";
                        player.style.left = (player_left + offset) + "px";
                    }
                    break;
                }
        }, speed);
    }
    getRotation(element){
        var style = window.getComputedStyle(element, null);
        var transform = style.getPropertyValue("transform"); //Add other methods back in, write a dedicated method to change all the ms-transform, etc stuff
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
            raycaster.cast(this.getRotation(document.getElementById("player")));
        }, 10);
        var player = document.getElementById("player");
        if (direction === "counter"){
            this.rotate_interval = setInterval(() => {
                player.style.transform = "rotate(" + (this.getRotation(player) - 1) + "deg)";
                this.reverse_rotation++;
            }, speed);
        } else if (direction === "clock"){
            this.rotate_interval = setInterval(() => {
                player.style.transform = "rotate(" + (this.getRotation(player) + 1) + "deg)";
                this.reverse_rotation--;
            }, speed);
        }
    }
    bindKeyboard(){
        document.addEventListener("keydown", (e) => {
            //this.boundsCollision();
            var code = e.which || e.key;
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
                        this.rotatePlayer("counter", 2);
                        break;
                    case 39:
                        this.rotatePlayer("clock", 2);
                        break;
                }
            }
        });
        document.addEventListener("keyup", (e) => {
            clearInterval(this.anim_interval);
            clearInterval(this.rotate_interval);
            clearInterval(this.reverse_rotate_int);
            this.animating = false;
        });
    }
}

var engine = new Engine();
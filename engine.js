class Engine {
    constructor(){
        this.map = [
                    "#","#","#","#","#","#","#","#",
                    "#",".",".",".",".",".",".","#",
                    "#",".",".",".",".",".",".","#",
                    "#",".",".",".",".",".",".","#",
                    "#",".",".",".",".",".",".","#",
                    "#",".",".",".",".",".",".","#",
                    "#",".",".",".","x",".",".","#",
                    "#",".",".",".",".",".",".","#",
                    "#","#","#","#","#","#","#","#"
                   ];
        this.map_width = 8;
        this.columns = 60;
        this.col_width = 100 / this.columns;
        this.scale_factor = window.innerHeight / 10; //Smaller = bigger
        this.anim_interval;
        this.rotate_interval;
        this.animating = false;
        this.collision_int;
        this.bounds_collision_int;
        this.wall_ids = [];
        this.validateMapData();
        this.draw2DMap();
        this.bindKeyboard();
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
        this.anim_interval = setInterval(function(){
            switch (direction){
                case "up":
                    player.style.top = (parseInt(player.style.top) - speed) + "px";
                    break;
                case "down":
                    player.style.top = (parseInt(player.style.top) + speed) + "px";
                    break;
                }
        }, speed);
        //For each degree of rotation, the box will need to move a little bit faster in that direction? So, 0 degrees will change top: -1, left: 0 for a 1 pixel height decrease. 1 degrees will change top -1, left -1 (1 pixel height decrease, 1 pixel right increase). Won't adding 180 to left/right adjustments be fucked, though? Should it just be capped at 1 - 5 pixels left depending on degree of rotation? Algorithm to get floating point each time? Will CSS even honor deg floats? Maximum left/right speed should be multiple of 90 (halfway turn). What about (rotation / 10) for 1 through 9 horizontal pixel movements? Good idea but a sudden 9 pixel jump is fucked. (rotation / 100) for 0.9-like jumps?
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
        var player = document.getElementById("player");
        if (direction === "counter"){
            this.rotate_interval = setInterval(() => {
                player.style.transform = "rotate(" + (this.getRotation(player) - 1) + "deg)";
            }, speed);
        } else if (direction === "clock"){
            this.rotate_interval = setInterval(() => {
                player.style.transform = "rotate(" + (this.getRotation(player) + 1) + "deg)";
            }, speed)
        }
    }
    bindKeyboard(){
        document.addEventListener("keydown", (e) => {
            this.boundsCollision();
            var code = e.which || e.key;
            if (this.animating === false){
                this.animating = true;
                //this.detectCollision();
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
            clearInterval(this.bounds_collision_int);
            //clearInterval(this.collision_int);
            this.animating = false;
        });
    }
    /*boundsCollision(){
        this.bounds_collision_int = setInterval(() => {
            var last_bottom = 0;
            $(".wall_tile").each(function(i){
                if (i = 0){
                    last_bottom = $(this).position().top + $(this).height();
                } else if (($(this).position().top + $(this).height()) > last_bottom){ //Search for map bottom, lowest value of bottom wall tiles (or highest since CSS)?
                    last_bottom = $(this).position().top + $(this).height();
                }
                if (($("#player").position().top + $("#player").height()) > last_bottom){
                    clearInterval(this.anim_interval);
                    alert("Collision");
                }
            });
        }, 2000);
    }*/
    /*detectCollision(){
        this.collision_int = setInterval(() => {
            var player_left = $("#player").position().left;
            var player_right = $("#player").position().left + $("#player").width();
            var player_top = $("#player").position().top;
            var player_bottom = $("#player").position().top + $("#player").height();
            $(".wall_tile").each(function(){
                var wall_left = $(this).position().left;
                var wall_right = $(this).position().left + $(this).width();
                var wall_top = $(this).position().top;
                var wall_bottom = $(this).position().top + $(this).height();
                if (player_top < wall_bottom){
                    console.log("Col");
                }
            });
        }, 100);
    }
    drawColumns(){
        for (var i = 0; i <= this.columns - 1; i++){
            var div = document.createElement("div");
            div.style.width = this.col_width + "%";
            div.style.height = "100%";
            div.style.left = (i * (100 / this.columns)) + "%";
            div.style.position = "absolute";
            div.classList.add("column");
            div.classList.add("vertical_center");
            div.id = "column" + i;
            document.body.appendChild(div);
        }
        this.createHallway();
    }
    createHallway(){
        var height1 = 100;
        var height2 = 0;
        for (var i = 0; i <= this.columns; i++){
            if (i <= (this.columns / 2)){
                var column = document.getElementById("column" + i);
                column.style.height = height1 + "%";
                column.style.webkitFilter = "brightness(" + height1 + "%)";
                height1 = height1 - 10;
            } else if (i >= (this.columns / 2)){
                var column = document.getElementById("column" + i);
                column.style.height = height2 + "%";
                column.style.webkitFilter = "brightness("+ height2 + "%)";
                height2 = height2 + 10;
            }
        }
    }*/
}

var engine = new Engine();
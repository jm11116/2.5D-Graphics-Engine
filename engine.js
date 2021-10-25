class GameMap {
    constructor(){
        this.room_data = [
                            "1", "1", "1", "1", "1", "1", "1", "1",
                            "1", "0", "0", "0", "0", "0", "0", "1",
                            "1", "0", "0", "0", "0", "0", "0", "1",
                            "1", "0", "0", "0", "0", "0", "0", "1",
                            "1", "0", "0", "0", "0", "0", "0", "1",
                            "1", "0", "0", "0", "0", "0", "0", "1",
                            "1", "0", "x", "0", "0", "0", "0", "1",
                            "1", "0", "0", "0", "0", "0", "0", "1",
                            "1", "0", "0", "0", "0", "0", "0", "1",
                            "1", "1", "1", "1", "1", "1", "1", "1"
                        ].reverse();
        this.room_width = 8; //Has to be manually specified
        this.tile_size = $(window).height() / 10;
    }
    createTile(color, x_pos, y_pos){
        var x_pos = x_pos * (this.tile_size + 2); //50 + 1 to show gridlines
        var y_pos = y_pos * (this.tile_size + 2);
        var tile = document.createElement("div");
        tile.style.backgroundColor = color;
        tile.style.width = this.tile_size + "px";
        tile.style.height = this.tile_size + "px";
        tile.style.top = y_pos + "px";
        tile.style.left = x_pos + "px";
        tile.style.position = "absolute";
        document.body.appendChild(tile);
    }
    outputRoom(){
        var x_pos = -1;
        var y_pos = 0;
        this.room_data.forEach((tile, index) => {
            if ((index % this.room_width) === 0){ //Drop to next row of two-dimensional array
                x_pos++;
                y_pos = 0;
            }
            if (this.room_data[index] === "x"){
                this.createTile("red", x_pos, y_pos);
            } else if (this.room_data[index] === "1"){
                this.createTile("black", x_pos, y_pos);
            } else if (this.room_data[index] === "0"){
                this.createTile("yellow", x_pos, y_pos);
            }
            y_pos++;
        });
    }
}

game = new GameMap();
game.outputRoom();
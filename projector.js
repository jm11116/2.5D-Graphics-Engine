class Projector {
    constructor(){
        this.columns = 10;
        this.col_width = 100 / this.columns;
        this.scene1 = [[100, 95, 90, 85, 80, 75, 70, 65, 60, 55],
                            [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]];
        this.scene2 = [[100, 80, 60, 40, 20, 20, 70, 80, 90, 100],
                            [100, 80, 60, 40, 10, 0, 40, 60, 80, 100]];
        this.scene3 = [[100, 90, 80, 70, 60, 50, 40, 85, 95, 100],
                            [100, 80, 70, 60, 50, 40, 20, 85, 95, 100]];
        this.drawColumns();
        this.manualDraw(this.scene3);
    }
    manualDraw(scene_data){
        for (var i = 0; i <= this.columns; i++){
            $("#column" + i).css("height", scene_data[0][i] + "%");
            $("#column" + i).css("filter", "brightness(" + scene_data[1][i] + "%)");
        }
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
        //this.createHallway();
    }
    createHallway(){
        var height1 = 100;
        var height2 = 0;
        for (var i = 0; i <= this.columns; i++){ //Vary col height and brightness based on distance. ColH inverse to distance,smaller = further, bigger = closer. 24 columns looks nice so we'll need 24 rays per frame but will that be smooth? Make a manual test, put player somewhere, and see if you can get it to paint the right column heights/brightnesses.
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
    }
}

var projector = new Projector();
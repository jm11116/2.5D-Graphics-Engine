class Projector {
    constructor(){
        this.columns = 24;
        this.col_width = 100 / this.columns;
        this.drawColumns();
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
        for (var i = 0; i <= this.columns; i++){ //Vary col height and brightness based on distance. ColH inverse to distance,smaller = further, bigger = closer. 24 columns looks nice so we'll need 24 rays per frame but will that be smooth?
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
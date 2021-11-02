class Projector {
    constructor(){
        this.columns = 44;
        this.col_width = 100 / this.columns;
        this.drawColumns();
    }
    drawColumns(){
        for (var i = 0; i < this.columns; i++){
            var div = document.createElement("div");
            div.style.width = this.col_width + "%";
            div.style.height = "100%";
            div.style.left = (i * (100 / this.columns)) + "%";
            div.style.position = "absolute";
            div.classList.add("column");
            div.classList.add("vertical_center");
            div.id = "column" + i;
            document.body.appendChild(div);
            if (engine.color === true){
                $(".column").addClass("colored_column");
            }
        }
    }
    render(scene_data){
        for (var i = 0; i <= this.columns; i++){
            if (scene_data[i] != null){
                $("#column" + i).css("height", scene_data[i] + "%");
                $("#column" + i).css("filter", "brightness(" + scene_data[i] + "%)");
            } else {
                $("#column" + i).css("height", "0%");
                $("#column" + i).css("filter", "brightness(0%)");
            }
        }
    }
    changeColumnSize(type){
        if (type === "bigger"){
            this.columns++;
        } else if (type === "smaller"){
            this.columns--;
        }
        this.col_width = 100 / this.columns;
        $(".column").remove();
        this.drawColumns();
        raycaster.getAllDistances(engine.getRotation(document.getElementById("player")));
    }
}

var projector = new Projector();
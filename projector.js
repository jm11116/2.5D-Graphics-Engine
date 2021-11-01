class Projector {
    constructor(){
        this.columns = 60;
        this.col_width = 100 / this.columns;
        this.random_scene = this.generateRandomScene();
//Heights and brightnesses need to be a float between 0 - 100. 100 is the max column height, so for all distances you'll need to do math to get numbers that work. Maybe scaling factor?
        this.drawColumns();
        this.manualDraw(this.random_scene);
    }
    generateRandomScene(){
        var scene = [];
        for (var i = 0; i < this.columns; i++){
            if (i < this.columns / 4){
                var random_number = Math.floor(Math.random() * 100);
            } else {
                var random_number = Math.floor(Math.random() * 50);
            }
            scene.push(random_number);
        }
        return scene;
    }
    manualDraw(scene_data){
        for (var i = 0; i <= this.columns; i++){
            $("#column" + i).css("height", scene_data[i] + "%");
            $("#column" + i).css("filter", "brightness(" + scene_data[i] + "%)");
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
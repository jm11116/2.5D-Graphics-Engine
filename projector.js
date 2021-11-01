class Projector {
    constructor(){
        this.columns = 60;
        this.col_width = 100 / this.columns;
        this.random_scene = this.generateRandomScene();
//Heights and brightnesses need to be a float between 0 - 100. 100 is the max column height, so for all distances you'll need to do math to get numbers that work. Maybe scaling factor?
        this.drawColumns();
        this.render(this.random_scene);
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
    }
    generateRandomScene(){
        var scene = [];
        for (var i = 0; i < this.columns; i++){
            if (i < this.columns / 4){
                var random_number = Math.floor(Math.random() * 120);
            } else {
                var random_number = Math.floor(Math.random() * 50);
            }
            scene.push(random_number);
        }
        return scene;
    }
    render(scene_data){
        for (var i = 0; i <= this.columns; i++){
            $("#column" + i).css("height", scene_data[i] + "%");
            $("#column" + i).css("filter", "brightness(" + scene_data[i] + "%)");
        }
    }
}

var projector = new Projector();
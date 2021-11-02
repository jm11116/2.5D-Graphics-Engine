class Stats {
    constructor(){
        this.refresh();
    }
    refresh(){
        setInterval(() => {
            $("#stats").html(
                    "<p>Rotation: " + engine.getRotation(document.getElementById("player")) + ", " +
                    "X: " + $("#player").position().left.toFixed(0) + ", " + 
                    "Y: " + $("#player").position().top.toFixed(0) + ", " +
                    "Scale: " + projector.columns + "</p>"
                );
        }, 600);
    }
}

var stats = new Stats();
stats.refresh();
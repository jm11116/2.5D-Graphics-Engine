class Stats {
    constructor(){
        this.refresh();
    }
    refresh(){
        setInterval(() => {
            $("#stats").html(
                    "<p>Rotation: " + engine.getRotation(document.getElementById("player")) + ", " +
                    "X: " + parseFloat($("#player").position().left.toFixed(2)) + ", " + 
                    "Y: " + parseFloat($("#player").position().top.toFixed(2)) + "</p>"
                );
        }, 600);
    }
}

var stats = new Stats();
stats.refresh();
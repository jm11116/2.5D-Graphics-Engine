class Collision {
    constructor(){
        this.collision_loop;
        this.iteration = 0;
    }
    collisionCheck(){ //Make only run on movement, performance
        this.collision_loop = setInterval(() => {
            this.wallCollision();
        }, 800);
    }
    drawCollisionMarkers(){
        var offset = 4;
        var upper_left = $("#player").position().left;
        var upper_right = upper_left + $("#player").width();
        var lower_left = upper_left + $("#player").height();
        var lower_right = upper_right + $("#player").height();
        var dot = document.createElement("div");
        dot.classList.add("coordinate_marker");
        dot.style.left = upper_left;
        dot.style.top = $("#player").position().top;
        document.body.appendChild(dot);
    }
}

var collision = new Collision();
//collision.drawCollisionMarkers();
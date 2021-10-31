class Collision {
    constructor(){
        this.collision_loop;
        this.detected = false;
        this.iteration = 0;
        //this.startCollisionCheck();
        //Use this to start projecting 3D space, translucent automap + bump msg
    }
    startCollisionCheck(){ //Make only run on movement, performance
        this.collision_loop = setInterval(() => {
            this.wallCollision();
        }, 100);
    }
    wallCollision(){
        engine.wall_ids.forEach((id) => {
            var rect1 = this.rectBounds($("#player"));
            var rect2 = this.rectBounds($("#" + id));
            if (this.rectCollision(rect1, rect2)){
                console.log("Collision" + this.iteration);
                this.iteration++;
            }
        });
    }
    rectBounds(element) {
        var position = element.position();
        return {
            left: position.left,
            top: position.top,
            width: element.width(),
            height: element.height()
        };
    }
    rectCollision(rect1, rect2) {
        var right1 = rect1.left + rect1.width;
        var right2 = rect2.left + rect2.width;
        var bottom1 = rect1.top + rect1.height;
        var bottom2 = rect2.top + rect2.height;
        var hitLeft = right1 > rect2.left && rect1.left < right2; //Bool
        var hitTop = bottom1 > rect2.top && rect1.top < bottom2; //Bool
        if (hitLeft && hitTop){
            return true;
        } else {
            return false;
        }
        //Use this to detect collision type too for the raytracer. Define the FOV (PI/4) and just rotate it with the player. Might be able to draw triangle using canvas. Cast one ray per column and get the collision type every time it hits a cell. When the collision type is a wall, get the wall's id somehow then get the distance as a float. How measure vector. You'll have to use sin and cos functions while take an angle. If can get the wall_id the ray stops at, maybe calc distance based on distance from player to the side that was hit (left + width or top + height). Can't measure distance by just line size because it could stop in middle of cell.
    }
}

var collision = new Collision();
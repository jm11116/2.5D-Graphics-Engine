    cast(angle){
        //Divide FOV by number of columns then use that to offset angle of each ray (ray0 = 0deg, ray1 = 4deg, ray2 = 8deg, etc)
        console.log(this.getRayTestCoords(angle));
        var angle = angle + 270;
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        var x1 = 80;
        var y1 = 80;
        var length = $(window).height();
        var x2 = x1 + Math.cos(Math.PI * angle / 180) * length;
        var y2 = y1 + Math.sin(Math.PI * angle / 180) * length;
        context.strokeStyle = "#FF0000";
        context.beginPath();
        context.moveTo(x2, y2);
        context.lineTo(x1, y1);
        context.stroke();
    }
        wallCollision(){
        engine.wall_ids.forEach((id) => {
            var rect1 = this.rectBounds($("#player"));
            var rect2 = this.rectBounds($("#" + id));
            if (this.rectCollision(rect1, rect2)){
                this.collision = "Collided with " + id;
            } else {
                this.collision = "None";
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
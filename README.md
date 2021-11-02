# 2.5D-Graphics-Engine

This is a basic pseudo-3D graphics engine written in JavaScript, inspired by javidx9's command-line FPS engine. Enable hardware acceleration in your browser for the best experience.

# Usage
- Control using arrow keys.
- Toggle stats with the 's' key.
- Toggle color with the 'c' key.
- Toggle the 2D minimap with the spacebar.
- Increase draw distance by editing the draw distance variable inside engine.js (warning: this may interfere with the raytracer).
- Increase visual fidelity or increase performance by alerting the number of columns drawn in the renderer with the '[' and ']' keys (warning: increasing the column number might make your PC chug).

# Screenshot

<img src="https://github.com/jm11116/2.5D-Game-Engine/blob/main/screenshots/Screen%20Shot%202021-11-02%20at%202.43.15%20PM.jpeg" style="max-width:650px"/>

# Future features
- Compensation for fish-eye effect.
- Collision (90% finished).
- Reverse movement.
- Faster movement on y-axis.
- Performance improvements by computing things once per frame instead of per function call.
- Texture mapping (grass, night sky, brick texture, etc).
- Sprites.

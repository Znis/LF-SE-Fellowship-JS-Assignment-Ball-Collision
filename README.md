# Ball Collision Simulation

Ball collision simulation using JavaScript and DOM manipulation.
The key concept used in this simulation is vector and elastic collision.
- The velocity is a vector so, it defines both direction and magnitude.
- The velocity of balls are resolved into X and Y component so, it determines how far the ball need to be moved in X and Y axes.
- The ball has multiple properties like mass, density, radius, volume etc. which can be tuned to mimic real world collision of different materials and objects. Here, the mass is calculated by the formula ( mass = density x volume) and the volume of ball is calculated by the formula ( volume = 4/3 * PI * r ^ 3).
- The color of the ball represents its mass. i.e. higher the mass, denser and darker the color is. Blue -> Pink -> Orange -> Maroon (lighter -> heavier ball)
- The collision of ball is based on elastic collision formula. Referenced from  [GeeksforGeeks Elastic Collision](https://www.geeksforgeeks.org/elastic-collision-formula/)

## Installation

The repository can be cloned and open with vscode and live server.

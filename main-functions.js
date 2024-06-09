/*function that assign the color to ball as per its mass
  (lighter like blue color means less mass and darker color like maroon means high mass) */
function assignColor(mass) {
  const interval = (MAX_MASS - MIN_MASS) / (COLORS.length + 1);
  const color_idx = Math.floor(mass / interval);
  return COLORS[color_idx];
}

/*initialises the number of balls in the 
container div in such a way that the no ball collide with each other at the spawn time */
function initialiseBalls() {
  let i = 1;

  while (i <= BALL_COUNT) {
    let doCollide = true;
    let r = getRandomInt(MIN_RADIUS, MAX_RADIUS);
    let density = getRandomInt(MIN_DENSITY, MAX_DENSITY);
    const randX = getRandomInt(BOUNDARY_X_MIN, BOUNDARY_X_MAX);
    const randY = getRandomInt(BOUNDARY_Y_MIN, BOUNDARY_Y_MAX);

    if (ballArray.length > 0) {
      for (let j = 0; j < ballArray.length; j++) {
        const newBall = { centreX: randX + r, centreY: randY + r, r: r };
        doCollide = checkForCollision(ballArray[j], newBall);
        if (doCollide) {
          break;
        }
      }
    } else {
      doCollide = false;
    }

    if (!doCollide) {
      const ball = new Ball(i, randX, randY, r, density);

      MAIN_CONTAINER.appendChild(ball.element);
      ballArray.push(ball);
      i++;
    }
  }
}

//function that determines the final velocity of two balls that collided with each other (implements elastic collision)
function calculateVelocityAfterCollision(ball1, ball2) {
  const ux1 = ball1.velocityX;
  const uy1 = ball1.velocityY;
  const ux2 = ball2.velocityX;
  const uy2 = ball2.velocityY;

  /*formula to calculate the final velocity of the collided balls 
  (formula sourced from https://www.geeksforgeeks.org/elastic-collision-formula/) */
  
  const vx1 =
    ((ball1.mass - ball2.mass) * ux1 + 2 * ball2.mass * ux2) /
    (ball1.mass + ball2.mass);
  const vy1 =
    ((ball1.mass - ball2.mass) * uy1 + 2 * ball2.mass * uy2) /
    (ball1.mass + ball2.mass);

  const vx2 =
    ((ball2.mass - ball1.mass) * ux2 + 2 * ball1.mass * ux1) /
    (ball1.mass + ball2.mass);
  const vy2 =
    ((ball2.mass - ball1.mass) * uy2 + 2 * ball1.mass * uy1) /
    (ball1.mass + ball2.mass);

  return { vx1: vx1, vy1: vy1, vx2: vx2, vy2: vy2 };
}

/* function that calculates required separation distance along X and Y component of the two collided balls 
   to ensure no overlapping of balls occur */
function calculateRequiredSeparationAfterCollision(ball1, ball2) {
  const distanceBetweenCentre = calculateDistanceBetweenCentre(ball1, ball2);
  const minDistanceBetweenCentre = ball1.r + ball2.r;
  const requiredSeparation = minDistanceBetweenCentre - distanceBetweenCentre;

  const dy = ball2.centreY - ball1.centreY;
  const dx = ball2.centreX - ball1.centreX;

  const collisionAngle = Math.atan2(dy, dx);
  const requiredSeparationX = requiredSeparation * Math.cos(collisionAngle);
  const requiredSeparationY = requiredSeparation * Math.sin(collisionAngle);
  return { X: requiredSeparationX, Y: requiredSeparationY };
}

//function that checks and handle the overall collision of all rendered balls
function checkAndHandleCollision() {
  for (let i = 0; i < BALL_COUNT; i++) {
    for (let j = i + 1; j < BALL_COUNT; j++) {
      if (!(ballArray[j].didCollide && ballArray[i].didCollide)) {
        const doCollide = checkForCollision(ballArray[i], ballArray[j]);

        if (doCollide) {
          ballArray[i].didCollide = true;
          ballArray[j].didCollide = true;
          const velocityAfterCollision = calculateVelocityAfterCollision(
            ballArray[i],
            ballArray[j]
          );

          ballArray[i].velocityX = velocityAfterCollision.vx1;
          ballArray[i].velocityY = velocityAfterCollision.vy1;
          ballArray[j].velocityX = velocityAfterCollision.vx2;
          ballArray[j].velocityY = velocityAfterCollision.vy2;

          const requiredSeparation = calculateRequiredSeparationAfterCollision(
            ballArray[i],
            ballArray[j]
          );

          ballArray[i].x -= requiredSeparation.X;
          ballArray[i].y -= requiredSeparation.Y;
          ballArray[j].x += requiredSeparation.X;
          ballArray[j].y += requiredSeparation.Y;
        }
      }
    }
  }
  for (let i = 0; i < BALL_COUNT; i++) {
    ballArray[i].didCollide = false;
  }
}

//function that clears or remove all the spawned balls in the container div
function clearBalls() {
  ballArray.forEach((ball) => ball.removeBall());
  ballArray = [];
}

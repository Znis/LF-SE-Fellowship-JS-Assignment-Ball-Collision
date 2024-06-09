function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const MAIN_CONTAINER = document.getElementById("main-container");
const NUMBER_OF_BALLS_INPUT = document.getElementById("num-of-balls");
const ENTER_BUTTON = document.getElementById("enter-btn");

const DEFAULT_RADIUS = 12;
const MIN_RADIUS = 8;
const MAX_RADIUS = 16;
const DEFAULT_DENSITY = 1;
const MIN_DENSITY = 0.5;
const MAX_DENSITY = 5;
const SPEED = 2;
const COLORS = ["aqua", "magenta", "orange", "maroon"];

let MAIN_CONTAINER_INFO = MAIN_CONTAINER.getBoundingClientRect();

let BALL_COUNT = 10;
let ballArray = [];

let BOUNDARY_X_MIN = 0;
let BOUNDARY_X_MAX = MAIN_CONTAINER_INFO.width;
let BOUNDARY_Y_MIN = 0;
let BOUNDARY_Y_MAX = MAIN_CONTAINER_INFO.height;

function assignColor(r, density) {
  if (r > 10 && r <= 12 && density > 1) {
    return COLORS[1];
  } else if (r > 12 && r <= 14 || density > 3) {
    return COLORS[2];
  } else if (r > 14 && r <= 16 || density > 4) {
    return COLORS[3];
  } else {
    return COLORS[0];
  }
}

class Ball {
  constructor(id, x, y, r, density) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r || DEFAULT_RADIUS;
    this.w = r * 2 || DEFAULT_RADIUS * 2;
    this.h = r * 2 || DEFAULT_RADIUS * 2;
    this.boundary_x_min = BOUNDARY_X_MIN;
    this.boundary_x_max = BOUNDARY_X_MAX - this.r * 2;
    this.boundary_y_min = BOUNDARY_Y_MIN;
    this.boundary_y_max = BOUNDARY_Y_MAX - this.r * 2;

    this.density = density || DEFAULT_DENSITY;

    this.speed = SPEED;
    this.didCollide = false;

    const volume = (4 / 3) * Math.PI * Math.pow(this.r, 3);
    this.mass = this.density * volume;

    this.color = assignColor(this.r, this.density);

    this.centreX = this.x + this.r;
    this.centreY = this.y + this.r;

    const moveDistanceX =
      this.speed * Math.random() * (Math.random() < 0.5 ? -1 : 1);
    const moveDistanceY =
      this.speed * Math.random() * (Math.random() < 0.5 ? -1 : 1);
    const angleBetweenDistanceXY = Math.atan(moveDistanceY / moveDistanceX);
    this.velocityX = this.speed * Math.cos(angleBetweenDistanceXY);
    this.velocityY = this.speed * Math.sin(angleBetweenDistanceXY);

    this.element = document.createElement("div");

    this.element.style.width = `${this.w}px`;
    this.element.style.height = `${this.h}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.position = `absolute`;
    this.element.style.background = this.color;
    this.element.style.borderRadius = "50%";

    this.element.addEventListener("click", () => {
      console.log(this);
    });
  }

  moveBall() {
    this.y = this.y + this.velocityY;
    this.x = this.x + this.velocityX;
    this.centreX = this.x + this.r;
    this.centreY = this.y + this.r;

    if (
      this.velocityX < 0 &&
      this.velocityY < 0 &&
      this.y <= this.boundary_y_min
    ) {
      this.velocityY = -1 * this.velocityY;
      this.y = this.boundary_x_min;
    } else if (
      this.velocityX > 0 &&
      this.velocityY < 0 &&
      this.y <= this.boundary_y_min
    ) {
      this.velocityY = -1 * this.velocityY;
      this.y = this.boundary_x_min;
    } else if (
      this.velocityX < 0 &&
      this.velocityY > 0 &&
      this.y >= this.boundary_y_max
    ) {
      this.velocityY = -1 * this.velocityY;
      this.y = this.boundary_y_max;
    } else if (
      this.velocityX > 0 &&
      this.velocityY > 0 &&
      this.y >= this.boundary_y_max
    ) {
      this.velocityY = -1 * this.velocityY;
      this.y = this.boundary_y_max;
    } else if (
      this.velocityX < 0 &&
      this.velocityY < 0 &&
      this.x <= this.boundary_x_min
    ) {
      this.velocityX = -1 * this.velocityX;
      this.x = this.boundary_x_min;
    } else if (
      this.velocityX < 0 &&
      this.velocityY > 0 &&
      this.x <= this.boundary_x_min
    ) {
      this.velocityX = -1 * this.velocityX;
      this.x = this.boundary_x_min;
    } else if (
      this.velocityX > 0 &&
      this.velocityY > 0 &&
      this.x >= this.boundary_x_max
    ) {
      this.velocityX = -1 * this.velocityX;
      this.x = this.boundary_x_max;
    } else if (
      this.velocityX > 0 &&
      this.velocityY < 0 &&
      this.x >= this.boundary_x_max
    ) {
      this.velocityX = -1 * this.velocityX;
      this.x = this.boundary_x_max;
    }

    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }

  removeBall() {
    this.element.remove();
  }
}

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

function calculateDistanceBetweenCentre(ball1, ball2) {
  const dx = ball2.centreX - ball1.centreX;
  const dy = ball2.centreY - ball1.centreY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

function checkForCollision(ball1, ball2) {
  const distance = calculateDistanceBetweenCentre(ball1, ball2);
  const doCollide = distance < ball1.r + ball2.r;
  return doCollide;
}

function calculateVelocityAfterCollision(ball1, ball2) {
  const ux1 = ball1.velocityX;
  const uy1 = ball1.velocityY;
  const ux2 = ball2.velocityX;
  const uy2 = ball2.velocityY;

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

function clearBalls() {
  ballArray.forEach((ball) => ball.removeBall());
  ballArray = [];
}

function animate() {
  for (let i = 0; i < BALL_COUNT; i++) {
    ballArray[i].moveBall();
  }
  checkAndHandleCollision();
  requestAnimationFrame(animate);
}

ENTER_BUTTON.addEventListener("click", () => {
  BALL_COUNT = Math.floor(NUMBER_OF_BALLS_INPUT.value);
  if (BALL_COUNT < 5 || BALL_COUNT > 500) {
    BALL_COUNT = 10;
    NUMBER_OF_BALLS_INPUT.value = 10;
  }
  clearBalls();
  initialiseBalls();
  if (!animationRunning) {
    animationRunning = true;
    animate();
  }
});

window.addEventListener("resize", () => {
  MAIN_CONTAINER_INFO = MAIN_CONTAINER.getBoundingClientRect();
  BOUNDARY_X_MIN = 0;
  BOUNDARY_X_MAX = MAIN_CONTAINER_INFO.width;

  BOUNDARY_Y_MIN = 0;
  BOUNDARY_Y_MAX = MAIN_CONTAINER_INFO.height;

  ballArray.forEach((ball) => {
    ball.boundary_x_max = BOUNDARY_X_MAX - ball.r * 2;
    ball.boundary_x_min = BOUNDARY_X_MIN;
    ball.boundary_y_max = BOUNDARY_Y_MAX - ball.r * 2;
    ball.boundary_y_min = BOUNDARY_Y_MIN;
  });
});

initialiseBalls();
animate();
let animationRunning = true;

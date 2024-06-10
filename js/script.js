//container where balls spawn and move
const MAIN_CONTAINER = document.getElementById("main-container");

//input field where user enters number of balls
const NUMBER_OF_BALLS_INPUT = document.getElementById("num-of-balls");
const ENTER_BUTTON = document.getElementById("enter-btn");

//variable values
let MAIN_CONTAINER_INFO = MAIN_CONTAINER.getBoundingClientRect();

let BALL_COUNT = 50;
let ballArray = [];

let BOUNDARY_X_MIN = 0;
let BOUNDARY_X_MAX = MAIN_CONTAINER_INFO.width;
let BOUNDARY_Y_MIN = 0;
let BOUNDARY_Y_MAX = MAIN_CONTAINER_INFO.height;

//function that runs recursively to maintain smooth animation frames of the ball movement and collision
function animate() {
  for (let i = 0; i < BALL_COUNT; i++) {
    ballArray[i].moveBall();
  }
  checkAndHandleCollision();
  requestAnimationFrame(animate);
}

/*event listener that checks if the user changes the number of balls in the input field
and if changed TouchEvent, re run the simulation */
ENTER_BUTTON.addEventListener("click", () => {
  BALL_COUNT = Math.floor(NUMBER_OF_BALLS_INPUT.value);
  if (
    BALL_COUNT < MIN_BALL_COUNT_ALLOWED ||
    BALL_COUNT > MAX_BALL_COUNT_ALLOWED
  ) {
    BALL_COUNT = 100;
    NUMBER_OF_BALLS_INPUT.value = 100;
  }
  clearBalls();
  initialiseBalls();
  if (!animationRunning) {
    animationRunning = true;
    animate();
  }
});

//event listener that checks if the browser is resized and change the balls movement boundaries respectively
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

//initial run of the collision simulation process
initialiseBalls();
animate();
let animationRunning = true;

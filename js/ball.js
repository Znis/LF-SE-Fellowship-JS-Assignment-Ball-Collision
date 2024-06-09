//Ball class defining its properties and methods
class Ball {
  constructor(id, x, y, r, density) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r || DEFAULT_RADIUS;
    this.w = r * 2 || DEFAULT_RADIUS * 2;
    this.h = r * 2 || DEFAULT_RADIUS * 2;

    this.boundary_x_min = BOUNDARY_X_MIN; //x-min boundary that the ball is free to go upto
    this.boundary_x_max = BOUNDARY_X_MAX - this.r * 2; //x-max boundary that the ball is free to go upto
    this.boundary_y_min = BOUNDARY_Y_MIN; //y-min boundary that the ball is free to go upto
    this.boundary_y_max = BOUNDARY_Y_MAX - this.r * 2; //y-max boundary that the ball is free to go upto

    this.density = density || DEFAULT_DENSITY;

    this.speed = SPEED; //initial speed of the ball
    this.didCollide = false; //flag to indicate the ball has collided

    const volume = (4 / 3) * Math.PI * Math.pow(this.r, 3); //calculates the volume of the ball
    this.mass = this.density * volume; //calculate mass with volume and density

    this.color = assignColor(this.mass);

    this.centreX = this.x + this.r; //determine the centre X coordinate of ball
    this.centreY = this.y + this.r; //determine the centre Y coordinate of ball

    const moveDistanceX =
      this.speed * Math.random() * (Math.random() < 0.5 ? -1 : 1); //randomly assign move distance in X-axis
    const moveDistanceY =
      this.speed * Math.random() * (Math.random() < 0.5 ? -1 : 1); //randomly assign move distance in Y-axis
    const angleBetweenDistanceXY = Math.atan(moveDistanceY / moveDistanceX); //angle between the X and Y move distance
    this.velocityX = this.speed * Math.cos(angleBetweenDistanceXY); //determine X component of ball's velocity
    this.velocityY = this.speed * Math.sin(angleBetweenDistanceXY); //determine Y component of ball's velocity

    //create the ball and append it to the DOM
    this.element = document.createElement("div");

    this.element.style.width = `${this.w}px`;
    this.element.style.height = `${this.h}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.position = `absolute`;
    this.element.style.background = this.color;
    this.element.style.borderRadius = "50%";
    this.element.style.background = `radial-gradient(circle at 65% 15%, #FFF5EE 1%, ${this.color} 60%, ${this.color} 100%)`;
  }

  //method that moves the ball in its direction of its velocity
  moveBall() {

    //update the x and y position of the ball
    this.y = this.y + this.velocityY;
    this.x = this.x + this.velocityX;

    //update the centre of the ball as x and y changes
    this.centreX = this.x + this.r;
    this.centreY = this.y + this.r;

    //conditions that check if the ball hit the boundaries and handle the bounce on boundaries
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

    //update the position of ball on DOM by updating its top and left properties
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }

  //method that removes the ball from DOM
  removeBall() {
    this.element.remove();
  }
}

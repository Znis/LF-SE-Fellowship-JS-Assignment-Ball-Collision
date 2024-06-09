function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

const MAIN_CONTAINER = document.getElementById("main-container");
const MAIN_CONTAINER_INFO = MAIN_CONTAINER.getBoundingClientRect();

const DEFAULT_RADIUS = 12;
const MIN_RADIUS = 8;
const MAX_RADIUS = 16;
const DEFAULT_DENSITY = 1;
const SPEED = 1;

const BALL_COUNT = 500;

const ballArray = [];



const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = MAIN_CONTAINER_INFO.width - (MAX_RADIUS * 2);

const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = MAIN_CONTAINER_INFO.height - (MAX_RADIUS * 2);


const COLORS = ["aqua", "orange", "maroon", "purple"];


function assignColor(r){
if (r > 10 && r <= 12){
  return COLORS[0];

}else if(r > 12 && r <= 14){
  return COLORS[1];

}else if(r > 14 && r <= 16){
  return COLORS[2];
  
}else{
  return COLORS[3];
}
}

class Ball {
  constructor(
    id,
    x,
    y,
    r,
    density
    
  ) {

    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r || DEFAULT_RADIUS;
    this.w = (r * 2) || (DEFAULT_RADIUS * 2);
    this.h = (r * 2) || (DEFAULT_RADIUS * 2);
    
    this.density = density || DEFAULT_DENSITY

    this.speed = SPEED;
    this.didCollide = false;

    const volume = 4 / 3 * Math.PI * Math.pow(this.r,3);
    this.mass = this.density * volume;

    this.color = assignColor(this.r);


    this.centreX = this.x + this.r;
    this.centreY = this.y + this.r;

    const moveDistanceX = (this.speed * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
    const moveDistanceY = (this.speed * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
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


 
  if ((this.velocityX < 0 && this.velocityY < 0) && this.y <= BOUNDARY_Y_MIN){
    this.velocityY = -1 * this.velocityY;
    this.y = BOUNDARY_X_MIN;
  }
  else if((this.velocityX > 0 && this.velocityY < 0) && this.y <= BOUNDARY_Y_MIN){
    this.velocityY = -1 * this.velocityY;
    this.y = BOUNDARY_X_MIN;
  }
  else if((this.velocityX < 0 && this.velocityY > 0) && this.y >= BOUNDARY_Y_MAX){
    this.velocityY = -1 * this.velocityY;
    this.y = BOUNDARY_Y_MAX;
  }
  else if((this.velocityX > 0 && this.velocityY > 0) && this.y >= BOUNDARY_Y_MAX){
    this.velocityY = -1 * this.velocityY;
    this.y = BOUNDARY_Y_MAX;
  }
  else if((this.velocityX < 0 && this.velocityY < 0) && this.x <= BOUNDARY_X_MIN){
    this.velocityX = -1 * this.velocityX;
    this.x = BOUNDARY_X_MIN;
  }
  else if((this.velocityX < 0 && this.velocityY > 0) && this.x <= BOUNDARY_X_MIN){
    this.velocityX = -1 * this.velocityX;
    this.x = BOUNDARY_X_MIN;

  }
  else if((this.velocityX > 0 && this.velocityY > 0) && this.x >= BOUNDARY_X_MAX){
    this.velocityX = -1 * this.velocityX;
    this.x = BOUNDARY_X_MAX;

  }
  else if((this.velocityX > 0 && this.velocityY < 0) && this.x >= BOUNDARY_X_MAX){
    this.velocityX = -1 * this.velocityX;
    this.x = BOUNDARY_X_MAX;

  }
        

      
    
   
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
}


function initialiseBalls(){

let i = 1;

while (i <= BALL_COUNT) {
  let doCollide = true;
  let r = getRandomInt(MIN_RADIUS, MAX_RADIUS);
  const randX = getRandomInt(BOUNDARY_X_MIN, BOUNDARY_X_MAX);
  const randY = getRandomInt(BOUNDARY_Y_MIN, BOUNDARY_Y_MAX);

  if(ballArray.length > 0){
    for (let j = 0; j < ballArray.length; j++) {
      const newBall = {'centreX': (randX + r), 'centreY': (randY + r), 'r':r};
      doCollide = checkForCollision(ballArray[j], newBall)
      if (doCollide){
        break
      }
    
    }
  }else{
    doCollide = false;
  }


  if (!doCollide) {
    const ball = new Ball(i, randX, randY, r);

    MAIN_CONTAINER.appendChild(ball.element);
    ballArray.push(ball);
    i++;
  }
}
}


function calculateDistanceBetweenCentre(ball1, ball2){
  const dx = ball2.centreX - ball1.centreX;
  const dy = ball2.centreY - ball1.centreY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}


function checkForCollision(ball1, ball2){
  const distance = calculateDistanceBetweenCentre(ball1, ball2);
  const doCollide = distance < (ball1.r + ball2.r); 
  return doCollide;
}

 function checkAndHandleCollision() {

  for (let i = 0; i < BALL_COUNT; i++) {
    for (let j=i+1; j < BALL_COUNT; j++){
      
      if(!(ballArray[j].didCollide && ballArray[i].didCollide)){
      const doCollide =  checkForCollision(ballArray[i], ballArray[j]);
        
  
        if (doCollide) {
 
          
          ballArray[i].didCollide = true;
          ballArray[j].didCollide = true;


          const ux1 = ballArray[i].velocityX;
          const uy1 = ballArray[i].velocityY;
          const ux2 = ballArray[j].velocityX;
          const uy2 = ballArray[j].velocityY;


          const vx1 = (((ballArray[i].mass-ballArray[j].mass) * ux1) + 2 * ballArray[j].mass * ux2) / (ballArray[i].mass+ballArray[j].mass);
          const vy1 = (((ballArray[i].mass-ballArray[j].mass) * uy1) + 2 * ballArray[j].mass * uy2) / (ballArray[i].mass+ballArray[j].mass);

          const vx2 = (((ballArray[j].mass-ballArray[i].mass) * ux2) + 2 * ballArray[i].mass * ux1) / (ballArray[i].mass+ballArray[j].mass);
          const vy2 = (((ballArray[j].mass-ballArray[i].mass) * uy2) + 2 * ballArray[i].mass * uy1) / (ballArray[i].mass+ballArray[j].mass);




ballArray[i].velocityX = vx1;
ballArray[i].velocityY = vy1;
ballArray[j].velocityX = vx2;
ballArray[j].velocityY = vy2;





const distanceBetweenCentre = calculateDistanceBetweenCentre(ballArray[i], ballArray[j]);
const minDistanceBetweenCentre = ballArray[i].r + ballArray[j].r;
const requiredSeparationOnEachBall = (minDistanceBetweenCentre - distanceBetweenCentre) / 2;

ballArray[i].x -= requiredSeparationOnEachBall;
ballArray[i].y -= requiredSeparationOnEachBall;
ballArray[j].x += requiredSeparationOnEachBall;
ballArray[j].y += requiredSeparationOnEachBall;



         
        }
      }
       
      
    }
   
  }
  for (let i=0; i < BALL_COUNT; i++){
    ballArray[i].didCollide = false;
  }

}

initialiseBalls()

setInterval(() => {
  for (let i=0; i < BALL_COUNT; i++){
  ballArray[i].moveBall();
  }  
  checkAndHandleCollision();
  
}, 1000/60);
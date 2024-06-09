//function that takes min and max number as args and returns a random int between the range
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//function that calculates distance between the centre of two balls
function calculateDistanceBetweenCentre(ball1, ball2) {
  const dx = ball2.centreX - ball1.centreX;
  const dy = ball2.centreY - ball1.centreY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

//function that checks whether the two balls collide with each other
function checkForCollision(ball1, ball2) {
  const distance = calculateDistanceBetweenCentre(ball1, ball2);
  const doCollide = distance < (ball1.r + ball2.r);
  return doCollide;
}

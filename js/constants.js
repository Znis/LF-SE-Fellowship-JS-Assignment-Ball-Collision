//constant values
const DEFAULT_RADIUS = 12;
const MIN_RADIUS = 8;
const MAX_RADIUS = 16;
const DEFAULT_DENSITY = 1;
const MIN_DENSITY = 0.5;
const MAX_DENSITY = 5;
const SPEED = 2;
const COLORS = ["#00B6D3", "magenta", "orange", "maroon"];
const MIN_MASS = MIN_DENSITY * ((4 / 3) * Math.PI * Math.pow(MIN_RADIUS, 3)); //calculates mass from volume and density
const MAX_MASS = MAX_DENSITY * ((4 / 3) * Math.PI * Math.pow(MAX_RADIUS, 3));
const MIN_BALL_COUNT_ALLOWED = 5;
const MAX_BALL_COUNT_ALLOWED = 1000;

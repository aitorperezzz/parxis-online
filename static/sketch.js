let client, colorHandler, mathHandler;

/* Define global names for all colors. */
const COLOR_RED = 'red';
const COLOR_BLUE = 'blue';
const COLOR_GREEN = 'green';
const COLOR_YELLOW = 'yellow';
const COLOR_BLACK = 'black';
const COLOR_WHITE = 'white';
const COLOR_GREY = 'grey';

/* Define general use global variables. */
const STROKE_WEIGHT = 2;
const TEXT_SIZE = 14;

/* Definitions for house and safe spots. */
const SAFE_SPOTS_BOTTOM = [8, 13];
const HOUSE_SPOT_COLORS = {
	18: COLOR_YELLOW,
	35: COLOR_BLUE,
	52: COLOR_RED,
	1: COLOR_GREEN,
};

/* Types of spots. */
const SPOT_TYPE_NORMAL = 'normal';
const SPOT_TYPE_SAFE = 'safe';
const SPOT_TYPE_HOUSE = 'house';

function setup() {
	let canvasWidth = 690;
	let canvasHeight = 690;
	createCanvas(canvasWidth, canvasHeight);

	colorHandler = new ColorHandler();
	mathHandler = new MathHandler();
	client = new Client(canvasWidth, canvasHeight);
}

function draw() {
	background(0);

	client.update();
	client.display();
}

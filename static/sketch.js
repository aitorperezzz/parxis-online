let client, colorHandler, mathHandler;

/* Define global names for all colors. */
const COLOR_RED = 'red';
const COLOR_BLUE = 'blue';
const COLOR_GREEN = 'green';
const COLOR_YELLOW = 'yellow';
const COLOR_BLACK = 'black';
const COLOR_WHITE = 'white';

/* Define general use global variables. */
const STROKE_WEIGHT = 2;
const TEXT_SIZE = 14;

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

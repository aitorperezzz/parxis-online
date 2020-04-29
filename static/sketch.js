let client, colorHandler;

/* Define global names for all colors */
const COLOR_RED = 'red';
const COLOR_BLUE = 'blue';
const COLOR_GREEN = 'green';
const COLOR_YELLOW = 'yellow';
const COLOR_BLACK = 'black';

/* Define general use global variables. */
const DEFAULT_STROKE_WEIGHT = 3;

function setup() {
	let canvasWidth = 690;
	let canvasHeight = 690;
	createCanvas(canvasWidth, canvasHeight);

	colorHandler = new ColorHandler();
	client = new Client(canvasWidth, canvasHeight);
}

function draw() {
	background(0);

	client.update();
	client.display();
}

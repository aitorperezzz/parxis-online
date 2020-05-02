class ColorHandler {
	constructor() {
		/* Create a dictionary with all the rgb colors available. */
		this.colors = {};
		this.colors[COLOR_RED] = color('#ff0000');
		this.colors[COLOR_BLUE] = color('#00bfff');
		this.colors[COLOR_GREEN] = color('#00ff00');
		this.colors[COLOR_YELLOW] = color('#ffff00');
		this.colors[COLOR_BLACK] = color('#000000');
		this.colors[COLOR_WHITE] = color('#ffffff');
	}

	/* Receives the name of the color and returns the p5js color object. */
	getColor(color) {
		if (color in this.colors) {
			return this.colors[color];
		}
		else {
			return undefined;
		}
	}
}

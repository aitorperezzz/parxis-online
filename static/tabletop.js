class Tabletop {
	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;

		/* Create four bases, one for each player. */
		let baseSize = 7 * canvasWidth / 23;
		this.bases = {};
		this.bases[COLOR_GREEN] = new Base(0, 0, baseSize, COLOR_GREEN);
		this.bases[COLOR_YELLOW] = new Base(canvasWidth - baseSize, 0, baseSize, COLOR_YELLOW);
		this.bases[COLOR_RED] = new Base(0, canvasHeight - baseSize, baseSize, COLOR_RED);
		this.bases[COLOR_BLUE] = new Base(canvasWidth - baseSize, canvasHeight - baseSize, baseSize, COLOR_BLUE);
	}

	display() {
		/* Call display on all the bases. */
		for (let base of Object.values(this.bases)) {
			base.display();
		}
	}
}

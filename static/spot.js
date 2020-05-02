class Spot extends ElementShape {
	constructor(vertices, fillColorName, number) {
		super(vertices, fillColorName);
		this.number = number;

		/* Calculate the center of the spot to display the number. */
		this.center = mathHandler.averagePoint(vertices);
	}

	display() {
		super.display();

		/* Display the number at the center of the spot. */
		fill(COLOR_BLACK);
		noStroke();
		textAlign(CENTER, CENTER);
		textSize(TEXT_SIZE);
		text(this.number, this.center.x, this.center.y);
	}
}

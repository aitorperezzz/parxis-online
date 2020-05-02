class Spot extends ElementShape {
	constructor(vertices, number) {
		/* Decides if this spot is special according to the number. */
		let safe = (number - SAFE_SPOTS_BOTTOM[0]) % 17 == 0 || (number - SAFE_SPOTS_BOTTOM[1]) % 17 == 0;
		let houseColorName = undefined;
		if (number in HOUSE_SPOT_COLORS) {
			houseColorName = HOUSE_SPOT_COLORS[number];
		}

		/* Decide the fill color of this spot according to the type. */
		let fillColorName = safe ? COLOR_GREY : COLOR_WHITE;
		fillColorName = houseColorName != undefined ? houseColorName : fillColorName;

		/* Call the constructor and finally store the values. */
		super(vertices, fillColorName);
		this.number = number;
		if (safe) {
			this.type = SPOT_TYPE_SAFE;
		}
		else if (houseColorName != undefined) {
			this.type = SPOT_TYPE_HOUSE;
			this.houseColorName = houseColorName;
		}
		else {
			this.type = SPOT_TYPE_NORMAL;
		}

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

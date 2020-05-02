class Spot extends ElementShape {
	constructor(vertices, number, abstractType, specialColorName) {
		let type, colorName;
		if (abstractType == SPOT_TYPE_NORMAL) {
			type = SPOT_TYPE_NORMAL;
			colorName = COLOR_WHITE;

			/* Decide if it is safe. */
			if ((number - SAFE_SPOTS_BOTTOM[0]) % 17 == 0 || (number - SAFE_SPOTS_BOTTOM[1]) % 17 == 0) {
				type = SPOT_TYPE_SAFE;
				colorName = COLOR_GREY;
			}

			/* Decide if it is a house. */
			else if (number in HOUSE_SPOT_COLORS) {
				type = SPOT_TYPE_HOUSE;
				colorName = HOUSE_SPOT_COLORS[number];
			}
		}
		else if (abstractType == SPOT_TYPE_SPECIAL) {
			type = SPOT_TYPE_SPECIAL;
			colorName = specialColorName;
		}

		/* Call the constructor and store the values. */
		super(vertices, colorName);
		this.number = number;
		this.type = type;
		this.colorName = colorName;

		/* Calculate the center of the spot to display the number. */
		this.center = mathHandler.averagePoint(vertices);
	}

	display() {
		super.display();

		/* Display the number only if not of special type. */
		if (this.type != SPOT_TYPE_SPECIAL) {
			fill(COLOR_BLACK);
			noStroke();
			textAlign(CENTER, CENTER);
			textSize(TEXT_SIZE);
			text(this.number, this.center.x, this.center.y);
		}
	}
}

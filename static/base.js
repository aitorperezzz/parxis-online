class Base {
	constructor(initialx, initialy, size, color) {
		this.initialx = initialx;
		this.initialy = initialy;
		this.size = size;
		this.color = colorHandler.getColor(color);
	}

	display() {
		stroke(COLOR_BLACK);
		strokeWeight(DEFAULT_STROKE_WEIGHT);
		fill(this.color);
		rect(this.initialx, this.initialy, this.size, this.size);
	}
}

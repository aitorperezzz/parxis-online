/* Base class that has a shape stored with vertices
and a fill color. */
class ElementShape {
	constructor(vertices, fillColorName) {
		this.vertices = vertices;
		this.fillColor = colorHandler.getColor(fillColorName);
	}

	display() {
		/* Display a black border around the shape. */
		stroke(COLOR_BLACK);
		strokeWeight(STROKE_WEIGHT);

		/* Fill the shape with the fill color. */
		fill(this.fillColor);
		beginShape();
		for (let currentVertex of this.vertices) {
			vertex(currentVertex.x, currentVertex.y);
		}
		endShape(CLOSE);
	}
}

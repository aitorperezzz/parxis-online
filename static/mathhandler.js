/* This class is unique, global and handles all the mathematics operations
(rotations, reference frame changes, averages, and much more). */
class MathHandler {
	constructor() {

	}

	/* Returns the canvas coordinates of a point expressed in a positive cartesian
 	reference frame centered at center. */
	getCanvasCoordinates(point, center) {
		return {
			x: center.x + point.x,
			y: center.y - point.y
		};
	}

	/* Returns an array with the canvas coordinates of all the points
	passed in the array. */
	getCanvasCoordinatesBatch(points, center) {
		let translatedPoints = [];
		for (let point of points) {
			translatedPoints.push(this.getCanvasCoordinates(point, center));
		}
		return translatedPoints;
	}

	/* Rotates the given point the given angle around the (0, 0) coordinates. */
	rotate(point, angle) {
		return {
			x: Math.round(point.x * Math.cos(angle) - point.y * Math.sin(angle)),
			y: Math.round(point.x * Math.sin(angle) + point.y * Math.cos(angle))
		};
	}

	/* Rotates all the points in the array by the given angle. */
	rotateBatch(points, angle) {
		let rotatedPoints = [];
		for (let point of points) {
			rotatedPoints.push(this.rotate(point, angle));
		}
		return rotatedPoints;
	}

	/* Calculates the average of the points provided. */
	averagePoint(points) {
		let totalx = 0, totaly = 0;
		for (let point of points) {
			totalx += point.x;
			totaly += point.y;
		}
		let length = points.length;
		return {x: totalx / length, y: totaly / length};
	}

	/* Receives a spot calculated at the bottom and fills the four total
	positions for this spot. */
	fillCorrespondingFourSpots(initialNumber, initialVertices, center, spots) {
		let currentNumber, currentVertices, currentCanvasVertices;
		for (let j = 0; j < 4; j++) {
			/* Calculate the correct number from the current initial number. */
			currentNumber = initialNumber + j * 17;
			if (currentNumber > 68) {
				currentNumber = currentNumber % 68;
			}

			/* Rotate the vertices if needed. */
			currentVertices = this.rotateBatch(initialVertices, j * Math.PI / 2);

			/* Translate all the vertices to the canvas coordinate system. */
			currentCanvasVertices = this.getCanvasCoordinatesBatch(currentVertices, center);

			/* Insert this spot in the dictionary. */
			spots[currentNumber] = new Spot(currentCanvasVertices, COLOR_WHITE, currentNumber);
		}
	}
}

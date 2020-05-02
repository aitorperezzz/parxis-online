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

	/* Applies rotations to the four directions and returns canvas coordinates. */
	applyRotationsAndCanvasCoordinates(shapes, center) {
		let result = [];
		let currentShape;
		for (let j = 0; j < 4; j++) {
			result.push([]);
			for (let shape of shapes) {
				/* Rotate this shape and transform to canvas coordinates. */
				currentShape = this.getCanvasCoordinatesBatch(this.rotateBatch(shape, j * Math.PI / 2), center);

				/* Add the new shape to the list. */
				result[j].push(currentShape);
			}
		}

		return result;
	}
}

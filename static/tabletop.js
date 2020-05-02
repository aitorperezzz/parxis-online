class Tabletop {
	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;

		/* Decide global dimensions and the global center position. */
		let canvasSize = canvasWidth;
		let center = {x: canvasSize / 2, y: canvasSize / 2};

		/* Create the vertices for the base in the upper left corner (global coordinates). */
		let baseSize = canvasSize / 3;
		let initialBaseVertices = [];
		initialBaseVertices.push({x: - canvasSize / 2, y: canvasSize / 2});
		initialBaseVertices.push({x: - canvasSize / 2 + baseSize, y: canvasSize / 2});
		initialBaseVertices.push({x: - canvasSize / 2 + baseSize, y: canvasSize / 2 - baseSize});
		initialBaseVertices.push({x: - canvasSize / 2, y: canvasSize / 2 - baseSize});

		/* Decide the positions of each color. */
		let basePositions = {
			0: COLOR_RED,
			1: COLOR_GREEN,
			2: COLOR_YELLOW,
			3: COLOR_BLUE,
		}

		/* Create the four bases, one for each player. */
		this.bases = {};
		let currentBaseVertices, currentColor, currentCanvasBaseVertices;
		for (let j = 0; j < 4; j++) {
			/* Rotate the vertices of the initial base. */
			currentBaseVertices = mathHandler.rotateBatch(initialBaseVertices, j * Math.PI / 2);

			/* Convert all the vertices to the canvas coordinate system. */
			currentCanvasBaseVertices = mathHandler.getCanvasCoordinatesBatch(currentBaseVertices, center);

			/* Decide the color of this base from the dictionary. */
			currentColor = basePositions[j];

			/* Add the new base. */
			this.bases[currentColor] = new Base(currentCanvasBaseVertices, currentColor);
		}

		/* Create an empty dictionary for the spots. */
		this.spots = {};

		/* Decide the block positions relative to the global center. */
		let initialxBlock = - canvasSize / 6;
		let initialyBlock = - canvasSize / 6;
		let spotHeight = canvasSize / 24;
		let spotWidth = canvasSize / 9;
		let initialNumber, currentNumber;
		let initialVertices, currentVertices, currentCanvasVertices;

		/* Create all spots on the relative left side. */
		initialNumber = 5;
		for (let i = 0; i < 8; i++) {
			/* Modify the initial vertices. */
			initialVertices = [];
			initialVertices.push({x: initialxBlock, y: initialyBlock - i * spotHeight});
			initialVertices.push({x: initialxBlock + spotWidth, y: initialyBlock - i * spotHeight});
			initialVertices.push({x: initialxBlock + spotWidth, y: initialyBlock - i * spotHeight - spotHeight});
			initialVertices.push({x: initialxBlock, y: initialyBlock - i * spotHeight - spotHeight});

			mathHandler.fillCorrespondingFourSpots(initialNumber, initialVertices, center, this.spots);
			initialNumber += 1;
		}

		/* Create the middle spot. */
		initialVertices = [];
		initialVertices.push({x: initialxBlock + spotWidth, y: initialyBlock - 7 * spotHeight});
		initialVertices.push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - 7 * spotHeight});
		initialVertices.push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - 8 * spotHeight});
		initialVertices.push({x: initialxBlock + spotWidth, y: initialyBlock - 8 * spotHeight});

		/* Select an initial number. */
		initialNumber = 13;

		mathHandler.fillCorrespondingFourSpots(initialNumber, initialVertices, center, this.spots);

		/* Create all the spots on the relative right side. */
		initialNumber = 21;
		for (let i = 0; i < 8; i++) {
			/* Modify the initial vertices. */
			initialVertices = [];
			initialVertices.push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - i * spotHeight});
			initialVertices.push({x: initialxBlock + 3 * spotWidth, y: initialyBlock - i * spotHeight});
			initialVertices.push({x: initialxBlock + 3 * spotWidth, y: initialyBlock - i * spotHeight - spotHeight});
			initialVertices.push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - i * spotHeight - spotHeight});

			mathHandler.fillCorrespondingFourSpots(initialNumber, initialVertices, center, this.spots);
			initialNumber -= 1;
		}
	}

	display() {
		/* Call display on all the bases. */
		for (let base of Object.values(this.bases)) {
			base.display();
		}

		/* Call display on all the spots. */
		for (let spot of Object.values(this.spots)) {
			spot.display();
		}
	}
}

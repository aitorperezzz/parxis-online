class Tabletop {
	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;

		/* Decide global dimensions and the global center. */
		let canvasSize = canvasWidth;
		let center = {x: canvasSize / 2, y: canvasSize / 2};

		/* Create the shape of the base in the upper left corner (using global coordinates). */
		let baseSize = canvasSize / 3;
		let initialBaseShape = [];
		initialBaseShape.push({x: - canvasSize / 2, y: canvasSize / 2});
		initialBaseShape.push({x: - canvasSize / 2 + baseSize, y: canvasSize / 2});
		initialBaseShape.push({x: - canvasSize / 2 + baseSize, y: canvasSize / 2 - baseSize});
		initialBaseShape.push({x: - canvasSize / 2, y: canvasSize / 2 - baseSize});

		/* Decide the positions of each color. */
		let baseColors = {
			0: COLOR_RED,
			1: COLOR_GREEN,
			2: COLOR_YELLOW,
			3: COLOR_BLUE,
		};

		/* Create four bases, one for each player. */
		this.bases = {};
		let allBaseShapes = mathHandler.applyRotationsAndCanvasCoordinates([initialBaseShape], center);
		for (let j = 0; j < 4; j++) {
			let currentColor = baseColors[j];
			this.bases[currentColor] = new Base(allBaseShapes[j][0], currentColor);
		}

		/* Create an empty dictionary for the spots. */
		this.spots = {};

		/* Decide the block position relative to the global center and the spot dimensions. */
		let initialxBlock = - canvasSize / 6;
		let initialyBlock = - canvasSize / 6;
		let spotHeight = canvasSize / 24;
		let spotWidth = canvasSize / 9;

		/* Create an array to store the shapes of the bottom block. */
		let bottomShapes = [];

		/* Add the shapes of the left side of the bottom block. */
		for (let i = 0; i < 8; i++) {
			bottomShapes.push([]);
			bottomShapes[i].push({x: initialxBlock, y: initialyBlock - i * spotHeight});
			bottomShapes[i].push({x: initialxBlock + spotWidth, y: initialyBlock - i * spotHeight});
			bottomShapes[i].push({x: initialxBlock + spotWidth, y: initialyBlock - i * spotHeight - spotHeight});
			bottomShapes[i].push({x: initialxBlock, y: initialyBlock - i * spotHeight - spotHeight});
		}

		/* Add the central shape. */
		bottomShapes.push([]);
		bottomShapes[8].push({x: initialxBlock + spotWidth, y: initialyBlock - 7 * spotHeight});
		bottomShapes[8].push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - 7 * spotHeight});
		bottomShapes[8].push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - 8 * spotHeight});
		bottomShapes[8].push({x: initialxBlock + spotWidth, y: initialyBlock - 8 * spotHeight});

		/* Add the shapes on the relative right side of the bottom block. */
		for (let i = 0; i < 8; i++) {
			bottomShapes.push([]);
			bottomShapes[9 + i].push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - (7 - i) * spotHeight});
			bottomShapes[9 + i].push({x: initialxBlock + 3 * spotWidth, y: initialyBlock - (7 - i) * spotHeight});
			bottomShapes[9 + i].push({x: initialxBlock + 3 * spotWidth, y: initialyBlock - (7 - i) * spotHeight - spotHeight});
			bottomShapes[9 + i].push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - (7 - i) * spotHeight - spotHeight});
		}

		/* Get all the shapes in canvas coordinates. */
		let allShapes = mathHandler.applyRotationsAndCanvasCoordinates(bottomShapes, center);

		/* Fill all the spots with the appropriate number. */
		let initialNumber = 5, currentNumber;
		for (let j = 0; j < 4; j++) {
			for (let i = 0; i < allShapes[j].length; i++) {

				/* Decide the number of this spot. */
				currentNumber = initialNumber + j * 17 + i;
				if (currentNumber > 68) {
					currentNumber = currentNumber % 68;
				}

				/* Fill in the spot. */
				this.spots[currentNumber] = new Spot(allShapes[j][i], currentNumber, SPOT_TYPE_NORMAL, undefined);
			}
		}

		/* Create a dictionary for the special spots. */
		this.specialSpots = {};

		/* Decide the order of the color from the bottom. */
		let finishColors = {
			0: COLOR_YELLOW,
			1: COLOR_BLUE,
			2: COLOR_RED,
			3: COLOR_GREEN,
		};

		/* Create the shapes of the special spots on the relative center. */
		let bottomSpecialShapes = [];
		for (let i = 0; i < 7; i++) {
			bottomSpecialShapes.push([]);
			bottomSpecialShapes[i].push({x: initialxBlock + spotWidth, y: initialyBlock - (6 - i) * spotHeight});
			bottomSpecialShapes[i].push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - (6 - i) * spotHeight});
			bottomSpecialShapes[i].push({x: initialxBlock + 2 * spotWidth, y: initialyBlock - (6 - i) * spotHeight - spotHeight});
			bottomSpecialShapes[i].push({x: initialxBlock + spotWidth, y: initialyBlock - (6 - i) * spotHeight - spotHeight});
		}

		/* Rotate these special shapes in the four directions. */
		let allSpecialShapes = mathHandler.applyRotationsAndCanvasCoordinates(bottomSpecialShapes, center);

		/* Insert them into the dictionary with the appropriate color. */
		this.specialSpots[COLOR_YELLOW] = {};
		this.specialSpots[COLOR_BLUE] = {};
		this.specialSpots[COLOR_RED] = {};
		this.specialSpots[COLOR_GREEN] = {};
		for (let j = 0; j < 4; j++) {
			for (let i = 0; i < allSpecialShapes[j].length; i++) {
				this.specialSpots[finishColors[j]][i] = new Spot(allSpecialShapes[j][i], i, SPOT_TYPE_SPECIAL, finishColors[j]);
			}
		}

		/* Create a dictionary for the finish lines. */
		this.finishLines = {};

		/* Create the finish line shape for the player at the bottom. */
		let initialFinishLineShape = [];
		initialFinishLineShape.push({x: 0, y: 0});
		initialFinishLineShape.push({x: initialxBlock, y: initialyBlock});
		initialFinishLineShape.push({x: Math.abs(initialxBlock), y: initialyBlock});

		/* Get the four finish line shapes. */
		let finishLinesShapes = mathHandler.applyRotationsAndCanvasCoordinates([initialFinishLineShape], center);

		/* Add all finish lines to the dictionary. */
		for (let j = 0; j < 4; j++) {
			this.finishLines[finishColors[j]] = new FinishLine(finishLinesShapes[j][0], finishColors[j]);
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

		/* Call display on all the special spots. */
		for (let color of Object.keys(this.specialSpots)) {
			for (let spot of Object.values(this.specialSpots[color])) {
				spot.display();
			}
		}

		/* Display the finish lines. */
		for (let finishLine of Object.values(this.finishLines)) {
			finishLine.display();
		}
	}
}

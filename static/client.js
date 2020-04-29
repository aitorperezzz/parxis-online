class Client {
	constructor(canvasWidth, canvasHeight) {
		this.tabletop = new Tabletop(canvasWidth, canvasHeight);
	}

	update() {

	}

	display() {
		this.tabletop.display();
	}
}

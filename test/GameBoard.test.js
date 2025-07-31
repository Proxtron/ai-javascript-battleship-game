import GameBoard from "../src/app/model/GameBoard";
import Ship from "../src/app/model/Ship";
import { OutOfBoundsError } from "../src/app/error/Error";

let gameBoard;
let expectedGrid;
beforeEach(() => {
	gameBoard = new GameBoard();
	expectedGrid = [];
	for (let i = 0; i < 10; i++) {
		expectedGrid.push([]);
		for (let j = 0; j < 10; j++) {
			expectedGrid[i].push([null, false]);
		}
	}
});

describe("GameBoard() constructor", () => {
	test("Grid initalizes correctly", () => {
		expect(gameBoard.grid).toEqual(expectedGrid);
	});
});

describe("placeShip()", () => {
	describe("places ship correctly in different points", () => {
		test("place ship at [5, 3]", () => {
			let newShip = new Ship(1);
			expectedGrid[5][3] = [newShip, false];

			gameBoard.placeShip(newShip, 5, 3, GameBoard.EAST);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});

		test("places ship on [0, 0]", () => {
			let newShip = new Ship(1);
			expectedGrid[0][0] = [newShip, false];
			gameBoard.placeShip(newShip, 0, 0, GameBoard.EAST);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});
	});

	describe("places ship correctly with different lengths", () => {
		test("place ship length 2", () => {
			let newShip = new Ship(2);
			expectedGrid[3][2] = [newShip, false];
			expectedGrid[3][3] = [newShip, false];

			gameBoard.placeShip(newShip, 3, 2, GameBoard.EAST);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});

		test("place ship length 4", () => {
			let newShip = new Ship(4);
			expectedGrid[3][2] = [newShip, false];
			expectedGrid[3][3] = [newShip, false];
			expectedGrid[3][4] = [newShip, false];
			expectedGrid[3][5] = [newShip, false];

			gameBoard.placeShip(newShip, 3, 2, GameBoard.EAST);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});
	});

	describe("places ship correctly in different directions", () => {
		test("place ship facing north", () => {
			let newShip = new Ship(3);
			expectedGrid[3][2] = [newShip, false];
			expectedGrid[2][2] = [newShip, false];
			expectedGrid[1][2] = [newShip, false];

			gameBoard.placeShip(newShip, 3, 2, GameBoard.NORTH);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});

		test("place ship facing east", () => {
			let newShip = new Ship(3);
			expectedGrid[3][2] = [newShip, false];
			expectedGrid[3][3] = [newShip, false];
			expectedGrid[3][4] = [newShip, false];

			gameBoard.placeShip(newShip, 3, 2, GameBoard.EAST);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});

		test("place ship facing south", () => {
			let newShip = new Ship(3);
			expectedGrid[3][2] = [newShip, false];
			expectedGrid[4][2] = [newShip, false];
			expectedGrid[5][2] = [newShip, false];

			gameBoard.placeShip(newShip, 3, 2, GameBoard.SOUTH);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});

		test("place ship facing west", () => {
			let newShip = new Ship(3);
			expectedGrid[3][2] = [newShip, false];
			expectedGrid[3][1] = [newShip, false];
			expectedGrid[3][0] = [newShip, false];

			gameBoard.placeShip(newShip, 3, 2, GameBoard.WEST);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});
	});

	describe("placing ship out of bounds throws OutOfBoundsError", () => {
		test("placing ship at [-1, -1] bounds throws OutOfBoundsError", () => {
			expect(() => {
				let newShip = new Ship(1);
				gameBoard.placeShip(newShip, -1, -1, GameBoard.NORTH);
			}).toThrow(OutOfBoundsError);
		});

		test("placing ship at [11, 11] bounds throws OutOfBoundsError", () => {
			expect(() => {
				let newShip = new Ship(1);
				gameBoard.placeShip(newShip, 11, 11, GameBoard.NORTH);
			}).toThrow(OutOfBoundsError);
		});
	});

	describe("place ship in bounds but runs out of bounds throws OutOfBoundsError", () => {
		test("ship runs out of bounds south", () => {
			expect(() => {
				let newShip = new Ship(5);
				gameBoard.placeShip(newShip, 9, 5, GameBoard.SOUTH);
			}).toThrow(OutOfBoundsError);
		});

		test("ship runs out of bounds east", () => {
			expect(() => {
				let newShip = new Ship(5);
				gameBoard.placeShip(newShip, 4, 9, GameBoard.EAST);
			}).toThrow(OutOfBoundsError);
		})

		test("ship runs out of bounds west", () => {
			expect(() => {
				let newShip = new Ship(5);
				gameBoard.placeShip(newShip, 4, 0, GameBoard.WEST);
			}).toThrow(OutOfBoundsError);
		})

		test("ship runs out of bounds north", () => {
			expect(() => {
				let newShip = new Ship(5);
				gameBoard.placeShip(newShip, 0, 4, GameBoard.NORTH);
			}).toThrow(OutOfBoundsError);
		})
	});

	describe("place ship with length 1 at the edge of grid facing outside of grid", () => {
		let newShip;
		beforeEach(() => {
			newShip = new Ship(1);
		})

		test("ship on north edge facing north", () => {
			expectedGrid[0][3] = [newShip, false];
			gameBoard.placeShip(newShip, 0, 3, GameBoard.NORTH);
			expect(gameBoard.grid).toEqual(expectedGrid);
		})

		test("ship on east edge facing east", () => {
			expectedGrid[3][9] = [newShip, false];
			gameBoard.placeShip(newShip, 3, 9, GameBoard.EAST)
			expect(gameBoard.grid).toEqual(expectedGrid);
		})

		test("ship on south edge facing south", () => {
			expectedGrid[9][3] = [newShip, false];
			gameBoard.placeShip(newShip, 9, 3, GameBoard.SOUTH)
			expect(gameBoard.grid).toEqual(expectedGrid);
		})

		test("ship on west edge facing west", () => {
			expectedGrid[3][0] = [newShip, false];
			gameBoard.placeShip(newShip, 3, 0, GameBoard.WEST)
			expect(gameBoard.grid).toEqual(expectedGrid);
		})
	});
});

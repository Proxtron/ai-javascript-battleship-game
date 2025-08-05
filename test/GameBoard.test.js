import GameBoard from "../src/app/model/GameBoard.js";
import Ship from "../src/app/model/Ship.js";
import { OutOfBoundsError } from "../src/app/error/Error.js";

jest.mock("../src/app/model/Ship.js", () => {
	return jest.fn().mockImplementation((length) => {
		let hitCount = 0;
		const mockShip = {
			length: length,
			hit: jest.fn(() => {
				if (hitCount < length) {
					hitCount++;
				}
			}),
			get isSunk() {
				return hitCount === length;
			},
		};
		return mockShip;
	});
});

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

	describe("placing ship adds to the ships array", () => {
		test("add length 2 ship at [0, 0] east", () => {
			let newShip = new Ship(2);
			gameBoard.placeShip(newShip, 0, 0, GameBoard.EAST);
			expect(gameBoard.ships).toEqual([
				{
					shipObject: newShip,
					shipOriginX: 0,
					shipOriginY: 0,
					shipDirection: GameBoard.EAST,
				}
			]);
		});

		test("adding two ships", () => {
			let newShip = new Ship(2);
			gameBoard.placeShip(newShip, 0, 0, GameBoard.EAST);
			let otherNewShip = new Ship(3);
			gameBoard.placeShip(otherNewShip, 5, 5, GameBoard.SOUTH);
			expect(gameBoard.ships).toEqual([
				{
					shipObject: newShip,
					shipOriginX: 0,
					shipOriginY: 0,
					shipDirection: GameBoard.EAST,
				},
				{
					shipObject: otherNewShip,
					shipOriginX: 5,
					shipOriginY: 5,
					shipDirection: GameBoard.SOUTH,
				},
			]);
		})
	});
});

describe("receiveAttack()", () => {
	let newShip;
	beforeEach(() => {
		newShip = new Ship(2);
	});

	describe("changes different points from unhit to hit", () => {
		test("attacking [3, 3] changes to hit", () => {
			expectedGrid[3][3][1] = true;
			gameBoard.receiveAttack(3, 3);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});

		test("attacking [2, 9] changes to hit", () => {
			expectedGrid[2][9][1] = true;
			gameBoard.receiveAttack(2, 9);
			expect(gameBoard.grid).toEqual(expectedGrid);
		});
	});

	describe("calls ship.hit() when attacking a cell with a ship in it", () => {
		test("it calls the hit method on the ship in the attacked cell", () => {
			gameBoard.placeShip(newShip, 3, 3, GameBoard.SOUTH);
			gameBoard.receiveAttack(3, 3);

			expect(newShip.hit).toHaveBeenCalled();
		});
	});


	test("hitting an already hit point doesn't change anything in that point", () => {
		gameBoard.placeShip(newShip, 3, 3, GameBoard.SOUTH);
		gameBoard.receiveAttack(3, 3);
		gameBoard.receiveAttack(3, 3);

		expectedGrid[3][3] = [newShip, true];
		expectedGrid[4][3] = [newShip, false];

		expect(gameBoard.grid).toEqual(expectedGrid);
	});

	describe("targeting a point out of bounds throws OutOfBoundsError", () => {
		test("attacking [-1, 0] throws", () => {
			expect(() => gameBoard.receiveAttack(-1, 0)).toThrow(OutOfBoundsError);
		})
		test("attacking [10, 0] throws", () => {
			expect(() => gameBoard.receiveAttack(10, 0)).toThrow(OutOfBoundsError);
		})
	})
});

describe("missedAttacks getter", () => {
	test("no missed attacks", () => {
		expect(gameBoard.missedAttacks).toEqual([]);
	});

	test("one missed attack", () => {
		gameBoard.receiveAttack(0, 0);
		expect(gameBoard.missedAttacks).toEqual([[0, 0]]);
	});

	test("multiple missed attacks", () => {
		gameBoard.receiveAttack(0, 0);
		gameBoard.receiveAttack(1, 1);
		gameBoard.receiveAttack(1, 2);
		expect(gameBoard.missedAttacks).toEqual([[0, 0], [1, 1], [1, 2]]);
	});

	test("hitting a ship doesn't add to missedAttacks", () => {
		gameBoard.placeShip(new Ship(2), 3, 3, GameBoard.SOUTH);
		gameBoard.receiveAttack(3, 3);
		gameBoard.receiveAttack(9, 9);
		gameBoard.receiveAttack(8, 8);
		expect(gameBoard.missedAttacks).toEqual([[8, 8], [9, 9]]);
	})
});

describe("allShipsSunk getter", () => {
	test("no ships", () => {
		expect(gameBoard.allShipsSunk).toBe(true);
	});

	test("one ship, none sunk", () => {
		const newShip = new Ship(2);
		gameBoard.placeShip(newShip, 3, 3, GameBoard.SOUTH);
		gameBoard.receiveAttack(3, 3);
		expect(gameBoard.allShipsSunk).toBe(false);
	});

	test("one ship, one sunk", () => {
		const newShip = new Ship(2);
		gameBoard.placeShip(newShip, 3, 3, GameBoard.SOUTH);
		gameBoard.receiveAttack(3, 3);
		gameBoard.receiveAttack(4, 3);
		expect(gameBoard.allShipsSunk).toBe(true);
	});
});

describe("hasShipAt()", () => {
	test("check an empty cell", () => {
		expect(gameBoard.hasShipAt(0, 0)).toBe(false);
	});

	test("check an occupied cell", () => {
		gameBoard.placeShip(new Ship(1), 0, 0, GameBoard.EAST);
		expect(gameBoard.hasShipAt(0, 0)).toBe(true);
	})

	describe("out of bounds point throws OutOfBoundsError", () => {
		test("checking [0, -1] throws", () => {
			expect(() => gameBoard.hasShipAt(-1, 0)).toThrow(OutOfBoundsError);
		});
		test("checking [0, 10] throws", () => {
			expect(() => gameBoard.hasShipAt(10, 0)).toThrow(OutOfBoundsError);
		});
	})
});

describe("isAttackedAt()", () => {
	test("unattacked cell returns false", () => {
		expect(gameBoard.isAttackedAt(0, 0)).toBe(false);
	});

	test("attacked cell returns true", () => {
		gameBoard.placeShip(new Ship(1), 0, 0, GameBoard.EAST);
		gameBoard.receiveAttack(0, 0);
		expect(gameBoard.isAttackedAt(0, 0)).toBe(true);
	});

	describe("out of bounds point throws OutOfBoundsError", () => {
		test("checking [0, -1] throws", () => {
			expect(() => gameBoard.isAttackedAt(-1, 0)).toThrow(OutOfBoundsError);
		});
		test("checking [0, 10] throws", () => {
			expect(() => gameBoard.isAttackedAt(10, 0)).toThrow(OutOfBoundsError);
		});
	})
})

describe("shipSunkAt()", () => {
	test("no ship, unattacked cell returns false", () => {
		expect(gameBoard.shipSunkAt(0, 0)).toBe(false);
	});

	test("ship in cell, but unattacked returns false", () => {
		gameBoard.placeShip(new Ship(1), 0, 0, GameBoard.EAST);
		expect(gameBoard.shipSunkAt(0, 0)).toBe(false);
	});

	test("ship in cell, attacked, but not sunk returns false", () => {
		gameBoard.placeShip(new Ship(2), 0, 0, GameBoard.EAST);
		gameBoard.receiveAttack(0, 0);
		expect(gameBoard.shipSunkAt(0, 0)).toBe(false);
	});

	test("ship in cell, is sunk and returns true", () => {
		gameBoard.placeShip(new Ship(2), 0, 0, GameBoard.EAST);
		gameBoard.receiveAttack(0, 0);
		gameBoard.receiveAttack(0, 1);
		
		expect(gameBoard.shipSunkAt(0, 0)).toBe(true);
	});
})
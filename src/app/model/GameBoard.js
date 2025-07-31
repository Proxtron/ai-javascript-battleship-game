import { OutOfBoundsError } from "../error/Error.js";

export default class GameBoard {
	grid = [];
	sideLength = 10;
	INITAL_CELL_STATE = [null, false];
	ships = [];

	static NORTH = 0;
	static EAST = 1;
	static SOUTH = 2;
	static WEST = 3;

	constructor() {
		this.#initalizeGrid();
	}

	#initalizeGrid() {
		for (let i = 0; i < this.sideLength; i++) {
			this.grid.push([]);
			for (let j = 0; j < this.sideLength; j++) {
				this.grid[i].push(0);
				this.#updateGridCell(i, j, ...this.INITAL_CELL_STATE);
			}
		}
	}

	#updateGridCell(row, column, occupyingShip, isAttacked) {
		this.grid[row][column] = [occupyingShip, isAttacked];
	}

	placeShip(ship, row, column, direction) {
		if (
			row < 0 ||
			column < 0 ||
			row > this.sideLength - 1 ||
			column > this.sideLength - 1
		) {
			throw new OutOfBoundsError(row, column);
		}

		switch (direction) {
			case GameBoard.NORTH:
                if((row - ship.length) + 1 < 0) throw new OutOfBoundsError(row, column, ship.length);
				for (let i = 0; i < ship.length; i++) {
					this.#updateGridCell(row - i, column, ship, false);
				}
				break;
			case GameBoard.EAST:
                if((column + ship.length) > this.sideLength) throw new OutOfBoundsError(row, column, ship.length);
				for (let i = 0; i < ship.length; i++) {
					this.#updateGridCell(row, column + i, ship, false);
				}
				break;
			case GameBoard.SOUTH:
                if((row + ship.length) > this.sideLength) throw new OutOfBoundsError(row, column, ship.length);
				for (let i = 0; i < ship.length; i++) {
					this.#updateGridCell(row + i, column, ship, false);
				}
				break;
			case GameBoard.WEST:
                if((column - ship.length) + 1 < 0) throw new OutOfBoundsError(row, column, ship.length);
				for (let i = 0; i < ship.length; i++) {
					this.#updateGridCell(row, column - i, ship, false);
				}
				break;
		}

		this.ships.push(ship);
	}

	receiveAttack(row, column) {
		if(row < 0 || column < 0 || row > this.sideLength - 1 || column > this.sideLength - 1) {
			throw new OutOfBoundsError(row, column);
		}

		const targetedCell = this.grid[row][column];
		if(targetedCell[0] !== null) {
			targetedCell[0].hit();
		}

		targetedCell[1] = true;
	}

	get missedAttacks() {
		const missedAttacks = [];
		for(let i = 0; i < this.sideLength; i++) {
			for(let j = 0; j < this.sideLength; j++) {
				const cell = this.grid[i][j];
				if (cell[0] === null && cell[1] === true) {
					missedAttacks.push([i, j]);
				}
			}
		}

		return missedAttacks;
	}

	get allShipsSunk() {
		for(const ship of this.ships) {
			if(!ship.isSunk) return false;
		}
		return true;
	}
}

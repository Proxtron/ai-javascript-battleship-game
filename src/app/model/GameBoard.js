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

	#checkOutOfBounds(row, column) {
		if (
			row < 0 ||
			column < 0 ||
			row > this.sideLength - 1 ||
			column > this.sideLength - 1
		) {
			throw new OutOfBoundsError(row, column);
		}
	}

	isPointOutOfBounds(row, column) {
		if (
			row < 0 ||
			column < 0 ||
			row > this.sideLength - 1 ||
			column > this.sideLength - 1
		) {
			return true;
		}

		return false;
	}

	isShipOutOfBounds(row, column, length, direction) {
		if(this.isPointOutOfBounds(row, column)) return true;

		switch(direction) {
			case GameBoard.NORTH:
				if((row - length) + 1 < 0) return true;
				break;
			case GameBoard.EAST:
				if((column + length) > this.sideLength) return true;
				break;
			case GameBoard.SOUTH:
				if((row + length) > this.sideLength) return true;
				break;
			case GameBoard.WEST:
				if((column - length) + 1 < 0) return true;
				break;
		}
		return false;
	}

	canPlaceShip(row, column, length, direction) {
		if(this.isShipOutOfBounds(row, column, length, direction)) return false;
		
		for(let i = 0; i < length; i++) {
			let r = row;
			let c = column;

			switch(direction) {
				case GameBoard.NORTH:
					r = row - i
					break;
				case GameBoard.EAST:
					c = c + i;
					break;
				case GameBoard.SOUTH:
					r = row + i;
					break;
				case GameBoard.WEST:
					c = c - i;
					break;
			}

			if(this.hasShipAt(r, c)) return false;
		}

		return true;
	}

	placeShip(ship, row, column, direction) {
		if(!this.canPlaceShip(row, column, ship.length, direction)) throw new OutOfBoundsError(row, column, ship.length);
		switch (direction) {
			case GameBoard.NORTH:
				for (let i = 0; i < ship.length; i++) {
					this.#updateGridCell(row - i, column, ship, false);
				}
				break;
			case GameBoard.EAST:
				for (let i = 0; i < ship.length; i++) {
					this.#updateGridCell(row, column + i, ship, false);
				}
				break;
			case GameBoard.SOUTH:
				for (let i = 0; i < ship.length; i++) {
					this.#updateGridCell(row + i, column, ship, false);
				}
				break;
			case GameBoard.WEST:
				for (let i = 0; i < ship.length; i++) {
					this.#updateGridCell(row, column - i, ship, false);
				}
				break;
		}

		this.ships.push({
			shipObject: ship,
			shipOriginX: column,
			shipOriginY: row,
			shipDirection: direction,
		});
	}

	receiveAttack(row, column) {
		this.#checkOutOfBounds(row, column);

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
			if(!ship.shipObject.isSunk) return false;
		}
		return true;
	}

	hasShipAt(row, column) {
		this.#checkOutOfBounds(row, column);
		return this.grid[row][column][0] !== null;
	}

	isAttackedAt(row, column) {
		this.#checkOutOfBounds(row, column);
		return this.grid[row][column][1];
	}

	shipSunkAt(row, column) {
		this.#checkOutOfBounds(row, column);
		if(this.grid[row][column][0] === null) {
			return false;
		}

		return this.grid[row][column][0].isSunk;
	}

	clearGameBoard() {
		this.ships = [];
		this.grid = [];
		this.#initalizeGrid();
	}

	getDragOverData(row, column, length, direction) {
		const canPlace = this.canPlaceShip(row, column, length, direction);
		const dragOverData = [];

		for(let i = 0; i < length; i++) {
			let r = row;
			let c = column;

			switch(direction) {
				case GameBoard.NORTH:
					r = row - i
					break;
				case GameBoard.EAST:
					c = column + i;
					break;
				case GameBoard.SOUTH:
					r = row + i;
					break;
				case GameBoard.WEST:
					c = column - i;
					break;
			}

			dragOverData.push({
				x: c,
				y: r,
				canPlace: canPlace
			});
		}

		return dragOverData;
	}
}

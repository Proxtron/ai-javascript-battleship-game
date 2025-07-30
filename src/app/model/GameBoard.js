import { OutOfBoundsError } from "../error/Error";

export default class GameBoard {
    grid = [];
    sideLength = 10;
    INITAL_CELL_STATE = [null, false];

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
            for(let j = 0; j < this.sideLength; j++) {
                this.grid[i].push(0);
                this.#updateGridCell(i, j, ...this.INITAL_CELL_STATE);
            }
        }
    }

    #updateGridCell(row, column, occupyingShip, isAttacked) {
        this.grid[row][column] = [occupyingShip, isAttacked];
    }

    placeShip(ship, row, column, direction) {
        if(row < 0 || column < 0) {
            throw new OutOfBoundsError(row, column, ship.length);
        }

        switch(direction) {
            case GameBoard.NORTH:
                for(let i = 0; i < ship.length; i++) {
                    this.#updateGridCell(row - i, column, ship, false);
                }
                break;
            case GameBoard.EAST:
                for(let i = 0; i < ship.length; i++) {
                    this.#updateGridCell(row, column + i, ship, false);
                }
                break;
            case GameBoard.SOUTH:
                for(let i = 0; i < ship.length; i++) {
                    this.#updateGridCell(row + i, column, ship, false);
                }
                break;
            case GameBoard.WEST:
                for(let i = 0; i < ship.length; i++) {
                    this.#updateGridCell(row, column - i, ship, false);
                }
                break;
        }
    }
}
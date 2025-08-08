export class InvalidShipLengthError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidShipLengthError";
    }
}

export class OutOfBoundsError extends Error {
    constructor(row, column, length) {
        if(!length) {
            super(`Point [${row}, ${column}] is out of bounds!`);
            this.name = "OutOfBoundsError";
        } else {
            super(`Placing ship with length: ${length} at row ${row} and column ${column} is out of bounds!`);
            this.name = "OutOfBoundsError";
        }

        
    }
}

export class PlayersTurnError extends Error {
    constructor() {
        super("Cannot call computerAttack() when it's the human player's turn")
        this.name = "PlayersTurnError";
    }
}
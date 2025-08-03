import { InvalidShipLengthError } from "../error/Error.js";

export default class Ship {
    length;
    hitCount;

    constructor(length) {
        if (length <= 0 || typeof length !== "number") {
            throw new InvalidShipLengthError("Ship length must be a positive integer")
        }

        this.length = length;
        this.hitCount = 0;
    }

    hit() {
        if (this.hitCount < this.length) {
            this.hitCount++;
        }
    }

    get isSunk() {
        return this.hitCount === this.length;
    }
}
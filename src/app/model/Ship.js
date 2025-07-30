import { InvalidShipLengthError } from "../error/Error.js";

export default class Ship {
    length;
    isSunk;
    hitCount;

    constructor(length) {
        if (length <= 0 || typeof length !== "number") {
            throw new InvalidShipLengthError("Ship length must be a positive integer")
        }

        this.length = length;
        this.isSunk = false;
        this.hitCount = 0;
    }

    hit() {
        if(this.hitCount === this.length - 1) {
            this.hitCount++;
            this.isSunk = true;
        }

        if (this.hitCount < this.length) {
            this.hitCount++;
        }
    }

    checkIsSunk() {
        return this.hitCount == this.length;
    }
}
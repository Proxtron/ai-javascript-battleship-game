import { InvalidShipLengthError } from "../error/Error";

export default class Ship {
    length;
    isSunk;
    hitCount;

    constructor(length) {
        if(length <= 0) {
            throw new InvalidShipLengthError("Ship length must be a positive integer")
        }

        this.length = length;
        this.isSunk = false;
        this.hitCount = 0;
    }

    hit() {
        if(this.hitCount < this.length) {
            this.hitCount++;
        }
    }
}
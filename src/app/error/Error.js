export class InvalidShipLengthError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidShipLengthError";
    }
}
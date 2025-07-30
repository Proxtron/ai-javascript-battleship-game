import { InvalidShipLengthError } from "../src/app/error/Error.js";
import Ship from "../src/app/model/Ship.js";

describe("Ship class", () => {
    describe("Ship() constuctor", () => {
        const ship = new Ship(5);
        test("ship initializes with provided length", () => {
            expect(ship.length).toBe(5);
        });

        test("ship initializes with isSunk false", () => {
            expect(ship.isSunk).toBe(false);
        });

        test("ship initializes with 0 hitCount", () => {
            expect(ship.hitCount).toBe(0);
        });

        test("constructor works with different lengths", () => {
            let otherShip = new Ship(3);
            expect(otherShip.length).toBe(3);
            otherShip = new Ship(4);
            expect(otherShip.length).toBe(4);
        })

        test("constructor throws InvalidShipLengthError for negative lengths", () => {
            expect(() => new Ship(-1)).toThrow(InvalidShipLengthError);
        });

        test("constructor throws InvalidShipLengthError for length 0", () => {
            expect(() => new Ship(0)).toThrow(InvalidShipLengthError);
        });

        test("constructor throws InvalidShipLengthError for non-number argument", () => {
            expect(() => new Ship()).toThrow(InvalidShipLengthError);
            expect(() => new Ship([])).toThrow(InvalidShipLengthError);
            expect(() => new Ship({})).toThrow(InvalidShipLengthError);
        });

    });

    describe("hit()", () => {
        test("call to hit increments hit attribute", () => {
            const ship = new Ship(3);
            ship.hit();
            expect(ship.hitCount).toBe(1);
            ship.hit();
            expect(ship.hitCount).toBe(2);
        })

        test("call to hit doesn't increment past ship length", () => {
            const ship = new Ship(4);
            ship.hit();
            ship.hit();
            ship.hit();
            ship.hit();
            expect(ship.hitCount).toBe(4);
            ship.hit();
            expect(ship.hitCount).toBe(4);
        });

        test("last hit to ship sinks the ship", () => {
            const ship = new Ship(3);
            ship.hit();
            ship.hit();
            expect(ship.isSunk).toBe(false);
            ship.hit();
            expect(ship.isSunk).toBe(true);
        })
    })

    describe("isSunk()", () => {
        test("Unsunk ship returns false", () => {
            const ship = new Ship(3);
            expect(ship.checkIsSunk()).toBe(false);
        });

        test("Sunk ship returns true", () => {
            const ship = new Ship(3);
            ship.hit();
            ship.hit();
            ship.hit();
            expect(ship.checkIsSunk()).toBe(true);
        });
    })
});
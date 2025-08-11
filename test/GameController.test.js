import game from "../src/app/controller/GameController";
import Player from "../src/app/model/Player";
import Ship from "../src/app/model/Ship";
import { PlayersTurnError } from "../src/app/error/Error";

jest.mock("../src/app/model/Ship", () => {
    return jest.fn().mockImplementation((length) => {
        return {
            length: length
        }
    });
});

jest.mock("../src/app/model/Player", () => {
    return jest.fn().mockImplementation((type) => {
        return {
            type: type,
            gameBoard: {
                placeShip: jest.fn(),
                receiveAttack: jest.fn(),
                isShipOutOfBounds: jest.fn(),
                canPlaceShip: jest.fn().mockReturnValue(true)
            }
        }
    })
});

// jest.mock("../src/app/model/GameBoard", () => {
//     return jest.fn().mockImplementation(() => {
//         return {
//             placeShip: jest.fn(),
//             receiveAttack: jest.fn()
//         }
//     })
// })

beforeEach(() => {
    Player.mockClear();
    Ship.mockClear();
    // GameBoard.mockClear();
    game.resetGame();
    game.startGame("Player");
})

describe("game.startGame()", () => {
    test("creates two players", () => {
        expect(Player).toHaveBeenCalledTimes(2);
    });

    test("creates 1 human player and 1 bot player", () => {
        expect(Player).toHaveBeenCalledWith(Player.BOT_TYPE, "Player");
        expect(Player).toHaveBeenCalledWith(Player.REAL_TYPE, "Bot");
    })

    test("starts with player 1 as starting player", () => {
        expect(game.currentTurn).toEqual(game.player1);
    });

    test("places 5 ships for each player", () => {
        expect(game.player1.gameBoard.placeShip).toHaveBeenCalledTimes(5);
        expect(game.player2.gameBoard.placeShip).toHaveBeenCalledTimes(5);
    })

    test("place one 5 length, one 4 length, two 3 length, one 2 length for each player", () => {
        const player1ShipLengths = game.player1.gameBoard.placeShip.mock.calls.map(call => call[0].length);
        const player2ShipLengths = game.player2.gameBoard.placeShip.mock.calls.map(call => call[0].length);

        const player1ShipLengthsSorted = player1ShipLengths.sort((a, b) => a - b);
        const player2ShipLengthsSorted = player2ShipLengths.sort((a, b) => a - b);
        
        expect(player1ShipLengthsSorted).toEqual([2, 3, 3, 4, 5]);
        expect(player2ShipLengthsSorted).toEqual([2, 3, 3, 4, 5]);
    });


    test("populates the game's availableComputerAttacks with 100 positions", () => {
        expect(game.availableComputerAttacks.length).toBe(100);
    })
});

describe("game.resetGame()", () => {
    beforeEach(() => {
        game.resetGame();
    });

    test("sets players to null", () => {
        expect(game.player1).toBe(null);
        expect(game.player2).toBe(null);
    });

    test("sets current turn to null", () => {
        expect(game.currentTurn).toBe(null);
    })

    test("sets availableComputerAttacks to empty array", () => {
        expect(game.availableComputerAttacks).toEqual([]);
    })
})

describe("game.switchTurn()", () => {
    test("switches turn from player 1 to player 2", () => {
        expect(game.currentTurn).toBe(game.player1);
        game.switchTurn();
        expect(game.currentTurn).toBe(game.player2);
    });

    test("switches turn from player 2 to player 1", () => {
        game.switchTurn();
        expect(game.currentTurn).toBe(game.player2);
        game.switchTurn();
        expect(game.currentTurn).toBe(game.player1);
    })
})

describe("game.hitCell()", () => {
    test("calls receiveAttack", () => {
        game.hitCell(0, 0);
        expect(game.player2.gameBoard.receiveAttack).toHaveBeenCalledTimes(1);
    });

})


describe("game.computerAttack()", () => {
    test("calling computerAttack when its the players turn throws PlayersTurnError", () => {
        game.currentTurn = game.player1; 
        expect(() => game.computerAttack()).toThrow(PlayersTurnError);
    });

    test("consumes an attack from game.availableComputerAttacks", () => {
        game.currentTurn = game.player2;
        game.computerAttack();
        expect(game.availableComputerAttacks.length).toBe(99);
    })
});

describe("game.checkWinner()", () => {
    test("both players with boards that have unsunk ships returns null", () => {
        expect(game.checkWinner()).toBe(null);
    });

    test("player 1 has all ship sunk and returns player2", () => {
        game.player1.gameBoard.allShipsSunk = true;
        expect(game.checkWinner()).toBe(game.player2);
    })

    test("player 2 has all ship sunk and returns player1", () => {
        game.player2.gameBoard.allShipsSunk = true;
        expect(game.checkWinner()).toBe(game.player1);
    })
})

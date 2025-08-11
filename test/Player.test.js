import Player from "../src/app/model/Player.js";
import GameBoard from "../src/app/model/GameBoard.js";

jest.mock("../src/app/model/GameBoard");

describe("Player()", () => {
    test("create real player", () => {
        const player = new Player(Player.REAL_TYPE, "Player");
        expect(player.type).toBe(Player.REAL_TYPE);
    });

    test("create bot player", () => {
        const player = new Player(Player.BOT_TYPE, "Bot");
        expect(player.type).toBe(Player.BOT_TYPE);
    });

    test("populates name attribute", () => {
        const player = new Player(Player.REAL_TYPE, "Player");
        expect(player.name).toBe("Player");
    })

    test("initializes a gameboard for the player", () => {
        GameBoard.mockClear();
        new Player(Player.REAL_TYPE);
        expect(GameBoard).toHaveBeenCalledTimes(1);
    })
})
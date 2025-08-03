import GameBoard from "./GameBoard";

export default class Player {
    static REAL_TYPE = 0;
    static BOT_TYPE = 1;

    type;
    gameBoard;
    constructor(type) {
        this.type = type;
        this.gameBoard = new GameBoard();
    }
}
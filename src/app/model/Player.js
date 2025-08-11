import GameBoard from "./GameBoard";

export default class Player {
    static REAL_TYPE = 0;
    static BOT_TYPE = 1;

    type;
    gameBoard;
    name;
    constructor(type, name) {
        this.type = type;
        this.name = name;
        this.gameBoard = new GameBoard();
    }
}
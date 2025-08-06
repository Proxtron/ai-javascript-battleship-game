import Player from "../model/Player";
import GameBoard from "../model/GameBoard";
import Ship from "../model/Ship";
import { PlayersTurnError } from "../error/Error";

const game = {
    player1: null,
    player2: null,
    currentTurn: null,

    startGame() {

        this.player1 = new Player(Player.REAL_TYPE);
        this.player2 = new Player(Player.BOT_TYPE);
        this.currentTurn = this.player1;

        this.player1.gameBoard.placeShip(new Ship(5), 1, 3, GameBoard.EAST);
        this.player1.gameBoard.placeShip(new Ship(4), 1, 0, GameBoard.SOUTH);
        this.player1.gameBoard.placeShip(new Ship(3), 9, 1, GameBoard.EAST);
        this.player1.gameBoard.placeShip(new Ship(3), 3, 8, GameBoard.WEST);
        this.player1.gameBoard.placeShip(new Ship(2), 6, 3, GameBoard.EAST);

        this.player2.gameBoard.placeShip(new Ship(5), 1, 5, GameBoard.EAST);
        this.player2.gameBoard.placeShip(new Ship(4), 1, 0, GameBoard.SOUTH);
        this.player2.gameBoard.placeShip(new Ship(3), 9, 1, GameBoard.EAST);
        this.player2.gameBoard.placeShip(new Ship(3), 3, 8, GameBoard.WEST);
        this.player2.gameBoard.placeShip(new Ship(2), 6, 3, GameBoard.EAST);
    },

    resetGame() {
        this.player1 = null;
        this.player2 = null;
        this.currentTurn = null;
    },

    switchTurn() {
        if(this.currentTurn === this.player1) {
            this.currentTurn = this.player2;
        } else {
            this.currentTurn = this.player1;
        }
    },

    hitCell(row, col) {
        const opponent = this.currentTurn === this.player1 ? this.player2 : this.player1;
        opponent.gameBoard.receiveAttack(row, col);
        this.switchTurn();
    },

    computerAttack() {
        if(this.currentTurn === this.player1) throw new PlayersTurnError();
        const row = Math.round(Math.random() * 9);
        const col = Math.round(Math.random() * 9);


    }
}

export default game;
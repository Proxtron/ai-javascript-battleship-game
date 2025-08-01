import Player from "../model/Player";
import GameBoard from "../model/GameBoard";
import Ship from "../model/Ship";
import GameBoardView from "../view/GameBoardView";

const player1 = new Player(Player.REAL_TYPE);
const player2 = new Player(Player.BOT_TYPE);

player1.gameBoard.placeShip(new Ship(5), 1, 3, GameBoard.EAST);
player1.gameBoard.placeShip(new Ship(4), 1, 0, GameBoard.SOUTH);
player1.gameBoard.placeShip(new Ship(3), 9, 1, GameBoard.EAST);
player1.gameBoard.placeShip(new Ship(3), 3, 8, GameBoard.WEST);
player1.gameBoard.placeShip(new Ship(2), 6, 3, GameBoard.EAST);

player2.gameBoard.placeShip(new Ship(5), 1, 5, GameBoard.EAST);
player2.gameBoard.placeShip(new Ship(4), 1, 0, GameBoard.SOUTH);
player2.gameBoard.placeShip(new Ship(3), 9, 1, GameBoard.EAST);
player2.gameBoard.placeShip(new Ship(3), 3, 8, GameBoard.WEST);
player2.gameBoard.placeShip(new Ship(2), 6, 3, GameBoard.EAST);

document.getElementById("game-board-container").append(GameBoardView(player1.gameBoard.grid), GameBoardView(player2.gameBoard.grid));
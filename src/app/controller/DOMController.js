import game from "./GameController";
import GameBoardView from "../view/GameBoardView";

let player1GameBoard;
let player2GameBoard;

init();
function init() {
    game.startGame();
    renderGameBoards();
}

function renderGameBoards() {

    player1GameBoard = GameBoardView(game.player1.gameBoard.grid, game.currentTurn === game.player2);
    player1GameBoard.id = "game-board-1";

    player2GameBoard = GameBoardView(game.player2.gameBoard.grid, game.currentTurn === game.player1);
    player2GameBoard.id = "game-board-2";

    addEventListeners();

    document.getElementById("game-board-container").append(player1GameBoard, player2GameBoard);
}

function addEventListeners() {
    const player1GridCells = player1GameBoard.querySelectorAll(".grid-cell");
    const player2GridCells = player2GameBoard.querySelectorAll(".grid-cell");

    if(game.currentTurn === game.player1) {
        player2GridCells.forEach((gridCell) => {
            gridCell.addEventListener("pointerenter", () => {
                gridCell.innerHTML = "<p>X</p>";
            });
            gridCell.addEventListener("pointerleave", () => {
                gridCell.innerHTML = "";
            });
        });
    } else {
        player1GridCells.forEach((gridCell) => {
            gridCell.addEventListener("pointerenter", () => {
                gridCell.innerHTML = "<p>X</p>";
            });
            gridCell.addEventListener("pointerleave", () => {
                gridCell.innerHTML = "";
            });
        });
    }
    
}

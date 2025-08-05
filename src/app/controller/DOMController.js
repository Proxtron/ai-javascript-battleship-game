import game from "./GameController";
import GameBoardView from "../view/GameBoardView";

let player1GameBoard;
let player2GameBoard;
const gameBoardContainer = document.getElementById("game-board-container");


init();
function init() {
    game.startGame();
    renderGameBoards();
}

function renderGameBoards() {
    gameBoardContainer.innerHTML = "";

    const isPlayer1Turn = game.currentTurn === game.player1;
    player1GameBoard = GameBoardView(game.player1.gameBoard.grid, !isPlayer1Turn, true);
    player1GameBoard.id = "game-board-1";

    player2GameBoard = GameBoardView(game.player2.gameBoard.grid, isPlayer1Turn, false);
    player2GameBoard.id = "game-board-2";

    addEventListeners(isPlayer1Turn);

    gameBoardContainer.append(player1GameBoard, player2GameBoard);
}

function addEventListeners(isPlayer1Turn) {
    if(isPlayer1Turn) {
        hoverXEffect(player2GameBoard);
        cellClickHandler(player2GameBoard);
    } else {
        hoverXEffect(player1GameBoard);
        cellClickHandler(player1GameBoard);
    }
}

function hoverXEffect(attackableBoard) {
    const cells = attackableBoard.querySelectorAll(".grid-cell");
    cells.forEach((gridCell) => {
        if(!gridCell.querySelector(".x-mark")) {
            gridCell.addEventListener("pointerenter", () => {
                gridCell.innerHTML = "<p class='x-mark light-x-mark'>X</p>";
            });
            gridCell.addEventListener("pointerleave", () => {
                gridCell.innerHTML = "";
            });
        }
    });
}

function cellClickHandler(attackableBoard) {
    const cells = attackableBoard.querySelectorAll(".grid-cell");
    cells.forEach((gridCell) => {
        gridCell.addEventListener("click", () => {
            const row = parseInt(gridCell.dataset.row);
            const col = parseInt(gridCell.dataset.col);
            game.hitCell(row, col);
            renderGameBoards();
        })
    })
}
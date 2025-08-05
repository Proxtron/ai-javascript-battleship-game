import game from "./GameController";
import BotGameBoardView from "../view/BotGameBoardView";
import HumanGameBoardView from "../view/HumanGameBoardView";

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
    player1GameBoard = HumanGameBoardView(game.player1.gameBoard, !isPlayer1Turn);
    player1GameBoard.id = "game-board-1";

    player2GameBoard = BotGameBoardView(game.player2.gameBoard, isPlayer1Turn);
    player2GameBoard.id = "game-board-2";

    addEventListeners(isPlayer1Turn);

    gameBoardContainer.append(player1GameBoard, player2GameBoard);
}

function addEventListeners(isPlayer1Turn) {
    if (isPlayer1Turn) {
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
        if (!gridCell.dataset.cellAttacked && !gridCell.dataset.shipSunk) {
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
        if (!gridCell.dataset.cellAttacked && !gridCell.dataset.shipSunk) {
            gridCell.addEventListener("click", () => {
                const row = parseInt(gridCell.dataset.row);
                const col = parseInt(gridCell.dataset.col);
                game.hitCell(row, col);
                renderGameBoards();
            });
        }
    })
}
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
    player1GameBoard = HumanGameBoardView(game.player1.gameBoard);
    player1GameBoard.id = "game-board-1";

    player2GameBoard = BotGameBoardView(game.player2.gameBoard);
    player2GameBoard.id = "game-board-2";

    addEventListeners();

    gameBoardContainer.append(player1GameBoard, player2GameBoard);
}

function addEventListeners() {
    hoverXEffect(player2GameBoard);
    cellClickHandler(player2GameBoard);
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
                game.computerAttack();
                renderGameBoards();
            });
        }
    })
}
import game from "./GameController";
import BotGameBoardView from "../view/BotGameBoardView";
import HumanGameBoardView from "../view/HumanGameBoardView";
import PubSub from "./PubSub";
import PlayerNamesView from "../view/PlayerNamesView";

let player1GameBoard;
let player2GameBoard;
const gameScreen = document.getElementById("game-screen");
const gameBoardContainer = document.getElementById("game-board-container");
const playerNamesContainer = document.getElementById("player-names-container");

export function showGameScreen(name) {
    game.startGame(name);
    gameScreen.classList.remove("hide");
    renderGameBoards();
}

export function hideGameScreen() {
    gameScreen.classList.add("hide");
    game.resetGame();
}

function renderGameBoards() {
    gameBoardContainer.innerHTML = "";
    playerNamesContainer.innerHTML = "";

    player1GameBoard = HumanGameBoardView(game.player1.gameBoard);
    player1GameBoard.id = "game-board-1";

    player2GameBoard = BotGameBoardView(game.player2.gameBoard);
    player2GameBoard.id = "game-board-2";

    playerNamesContainer.innerHTML = PlayerNamesView(game.player1, game.player2);

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
                renderGameBoards();
                
                if(game.checkWinner() === game.player1) {
                    PubSub.publish("game_finished", {winningPlayerName: game.player1.name, winnerIsHuman: true});
                } else if(game.checkWinner() === game.player2) {
                    PubSub.publish("game_finished", {winningPlayerName: game.player2.name, winnerIsHuman: false});
                } else if(game.checkWinner() === null) {
                    game.computerAttack();
                    renderGameBoards();
                }
            });
        }
    })
}
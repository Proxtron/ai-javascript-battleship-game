import game from "./GameController";
import BotGameBoardView from "../view/BotGameBoardView";
import HumanGameBoardView from "../view/HumanGameBoardView";
import PubSub from "./PubSub";
import PlayerNamesView from "../view/PlayerNamesView";

const gameScreen = document.getElementById("game-screen");
const gameBoardContainer = document.getElementById("game-board-container");
const playerNamesContainer = document.getElementById("player-names-container");

export function showGameScreen() {
    gameScreen.classList.remove("hide");
    renderGameBoards(false);
}

export function hideGameScreen() {
    gameScreen.classList.add("hide");
    game.resetGame();
}

function renderGameBoards(botIsThinking) {
    gameBoardContainer.innerHTML = "";
    playerNamesContainer.innerHTML = "";

    const player1GameBoard = HumanGameBoardView(game.player1.gameBoard);
    player1GameBoard.id = "game-board-1";

    const player2GameBoard = BotGameBoardView(game.player2.gameBoard);
    player2GameBoard.id = "game-board-2";

    playerNamesContainer.innerHTML = PlayerNamesView(game.player1, game.player2, botIsThinking);

    gameBoardContainer.append(player1GameBoard, player2GameBoard);
    addEventListeners();
}

function addEventListeners() {
    hoverXEffect();
    cellClickHandler();
}

function hoverXEffect() {
    const botGameBoard = document.getElementById("game-board-2");
    const cells = botGameBoard.querySelectorAll(".grid-cell");
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

function cellClickHandler() {
    const botGameBoard = document.getElementById("game-board-2");
    const cells = botGameBoard.querySelectorAll(".grid-cell");
    cells.forEach((gridCell) => {
        if (!gridCell.dataset.cellAttacked && !gridCell.dataset.shipSunk) {
            gridCell.addEventListener("click", () => {

                const row = parseInt(gridCell.dataset.row);
                const col = parseInt(gridCell.dataset.col);

                //Human player turn to hit. Hit cell, render, check end of game
                game.hitCell(row, col);
                renderGameBoards(false);
                checkEndOfGame();

                //Bot player turn to hit. Hit cell, render, check end of game
                renderGameBoards(true);

                //Bot "thinks" randomly between 1.0s and 1.5s
                const randomBotThinkingTime = ((Math.random() * .5) + 1.0) * 1000;

                disableCellClicks();
                setTimeout(() => {
                    game.computerAttack();
                    renderGameBoards(false);
                    checkEndOfGame();
                }, randomBotThinkingTime)
            });
        }
    })
}

function disableCellClicks() {
    const botGameBoard = document.getElementById("game-board-2");
    const cells = botGameBoard.querySelectorAll(".grid-cell");
    cells.forEach((gridCell) => {
        gridCell.style.pointerEvents = "none";
        gridCell.style.cursor = "not-allowed";
    });
}

function enableCellClicks() {
    const botGameBoard = document.getElementById("game-board-2");
    const cells = botGameBoard.querySelectorAll(".grid-cell");
    cells.forEach((gridCell) => {
        gridCell.style.pointerEvents = "auto";
    });
}

function checkEndOfGame() {
    if(game.checkWinner() === game.player1) {
        PubSub.publish("game_finished", {humanPlayerName: game.player1.name, winnerIsHuman: true});
    } else if(game.checkWinner() === game.player2) {
        PubSub.publish("game_finished", {humanPlayerName: game.player1.name, winnerIsHuman: false});
    }
}
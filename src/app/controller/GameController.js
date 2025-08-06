import Player from "../model/Player";
import GameBoard from "../model/GameBoard";
import Ship from "../model/Ship";
import { PlayersTurnError } from "../error/Error";


const populateComputerAttacks = (availableComputerAttacks) => {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            availableComputerAttacks.push({
                x: j,
                y: i
            })
        }
    }
}

const getRandomAttackIndex = (availableComputerAttacks) => {
    return Math.floor(Math.random() * availableComputerAttacks.length);
}

const randomShipPlacement = (gameBoard) => {
    const noOfDirections = 3;
    for(const shipLength of availableShipLengths) {
        const randomDirection = Math.floor(Math.random() * (noOfDirections + 1));
        let randomX;
        let randomY;

        do {
            randomX = Math.floor(Math.random() * 10)
            randomY = Math.floor(Math.random() * 10);
        } while(!gameBoard.canPlaceShip(randomY, randomX, shipLength, randomDirection));

        gameBoard.placeShip(new Ship(shipLength), randomY, randomX, randomDirection);
    }
}

const availableShipLengths = [5, 4, 3, 3, 2];

const game = {
    player1: null,
    player2: null,
    currentTurn: null,
    availableComputerAttacks: [],

    startGame() {
        this.player1 = new Player(Player.REAL_TYPE);
        this.player2 = new Player(Player.BOT_TYPE);
        this.currentTurn = this.player1;
        populateComputerAttacks(this.availableComputerAttacks);
        randomShipPlacement(this.player1.gameBoard);
        randomShipPlacement(this.player2.gameBoard);
    },

    resetGame() {
        this.player1 = null;
        this.player2 = null;
        this.currentTurn = null;
        this.availableComputerAttacks = [];
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

        const randomAttackIndex = getRandomAttackIndex(this.availableComputerAttacks);
        const randomAttackX = this.availableComputerAttacks[randomAttackIndex].x;
        const randomAttackY = this.availableComputerAttacks[randomAttackIndex].y;

        this.availableComputerAttacks.splice(randomAttackIndex, 1);

        this.hitCell(randomAttackY, randomAttackX);
    },

    checkWinner() {
        return false;
    }
}

export default game;
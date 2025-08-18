import Player from "../model/Player";
import Ship from "../model/Ship";
import { PlayersTurnError } from "../error/Error";

const randomShipPlacement = (gameBoard) => {
    const noOfDirections = 3;
    for (const shipLength of availableShipLengths) {
        const randomDirection = Math.floor(Math.random() * (noOfDirections + 1));
        let randomX;
        let randomY;

        do {
            randomX = Math.floor(Math.random() * 10)
            randomY = Math.floor(Math.random() * 10);
        } while (!gameBoard.canPlaceShip(randomY, randomX, shipLength, randomDirection));

        gameBoard.placeShip(new Ship(shipLength), randomY, randomX, randomDirection);
    }
}

const doHuntAttack = (opponent) => {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);

    while(opponent.gameBoard.isAttackedAt(randomY, randomX)) {
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * 10);
    }

    game.hitCell(randomY, randomX);

    if (opponent.gameBoard.hasShipAt(randomY, randomX)) {
        game.lastComputerHit = {x: randomX, y: randomY};
        loadQueue(opponent);
    }
}

const doSinkAttack = (opponent) => {
    const nextInQueue = game.computerAttackQueue.shift();
    game.hitCell(nextInQueue.y, nextInQueue.x);
    if (opponent.gameBoard.hasShipAt(nextInQueue.y, nextInQueue.x)) {
        game.lastComputerHit = {x: nextInQueue.x, y: nextInQueue.y};
        loadQueue(opponent);
    }
}

const loadQueue = (opponent) => {
    const previousXAttack = game.lastComputerHit.x;
    const previousYAttack = game.lastComputerHit.y;

    const nextAttacks = probe(previousXAttack, previousYAttack, opponent);
    const uniqueNext = nextAttacks.filter((attack) => {
        const attackKey = `${attack.x},${attack.y}`;
        return !game.computerAttackQueue.some((queuedAttack) => {
            return `${queuedAttack.x},${queuedAttack.y}` === attackKey;
        });
    });

    game.computerAttackQueue.push(...uniqueNext);

    //Clean the queue from stale attacks
    game.computerAttackQueue.filter((attack) => {
        return !opponent.gameBoard.isAttackedAt(attack.y, attack.x);
    });
}


const probe = (x, y, opponent) => {
    const possibleAttacks = [];
    const adjacentRelativeSpots = [TOP, RIGHT, BOTTOM, LEFT];
    
    for (const adjacentSpot of adjacentRelativeSpots) {
        const currentSpotLookedAt = { x: x + adjacentSpot.x, y: y + adjacentSpot.y };
        if (!opponent.gameBoard.isPointOutOfBounds(currentSpotLookedAt.y, currentSpotLookedAt.x)
            && !opponent.gameBoard.isAttackedAt(currentSpotLookedAt.y, currentSpotLookedAt.x)) {
            possibleAttacks.push(currentSpotLookedAt);
        }
    }

    return possibleAttacks;
}

const availableShipLengths = [5, 4, 3, 3, 2];

const TOP = { x: 0, y: -1 };
const RIGHT = { x: 1, y: 0 };
const BOTTOM = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };


const game = {
    player1: null,
    player2: null,
    currentTurn: null,

    computerAttackQueue: [],
    lastComputerHit: null,

    initalizePlayers(humanPlayerName) {
        this.player1 = new Player(Player.REAL_TYPE, humanPlayerName);
        this.player2 = new Player(Player.BOT_TYPE, "Bot");
        randomShipPlacement(this.player2.gameBoard);
    },

    placeHumanShipsRandomly() {
        randomShipPlacement(this.player1.gameBoard);
    },

    clearHumanShips() {
        this.player1.gameBoard.clearGameBoard();
    },

    startGame(name) {
        this.currentTurn = this.player1;
        
    },

    resetGame() {
        this.player1 = null;
        this.player2 = null;
        this.currentTurn = null;
    },

    switchTurn() {
        if (this.currentTurn === this.player1) {
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
        if (this.currentTurn === this.player1) throw new PlayersTurnError();
        if (this.computerAttackQueue.length === 0) {
            doHuntAttack(this.player1);
        } else {
            doSinkAttack(this.player1);
        }
    },

    checkWinner() {
        if (this.player1.gameBoard.allShipsSunk) return this.player2;
        else if (this.player2.gameBoard.allShipsSunk) return this.player1;
        else return null;
    }
}

export default game;
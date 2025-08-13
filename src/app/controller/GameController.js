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
    console.log("Doing hunt attack");
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);

    while(opponent.gameBoard.isAttackedAt(randomY, randomX)) {
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * 10);
    }

    game.hitCell(randomY, randomX);

    if (opponent.gameBoard.hasShipAt(randomY, randomX)) {
        game.computerStrategy = STRATEGY_SINK;
        game.lastComputerHit = {x: randomX, y: randomY};
    }
}

const doSinkAttack = (opponent) => {
    console.log("doing sink attack");
    const previousXAttack = game.lastComputerHit.x;
    const previousYAttack = game.lastComputerHit.y;

    const nextAttacks = probe(previousXAttack, previousYAttack, opponent);
    const uniqueNext = nextAttacks.filter((attack) => {
        return !game.computerAttackQueue.includes(attack);
    });

    game.computerAttackQueue.push(...uniqueNext);

    if(game.computerAttackQueue.length === 0) {
        game.computerStrategy = STRATEGY_HUNT;
    } else {
        const nextInQueue = game.computerAttackQueue.shift();
        game.hitCell(nextInQueue.y, nextInQueue.y);
        if (opponent.gameBoard.hasShipAt(nextInQueue.y, nextInQueue.x)) {
            game.lastComputerHit = {x: nextInQueue.x, y: nextInQueue.y};
        }
    }
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

const STRATEGY_HUNT = 0;
const STRATEGY_SINK = 1;

const game = {
    player1: null,
    player2: null,
    currentTurn: null,

    computerStrategy: STRATEGY_HUNT,
    computerAttackQueue: [],
    lastComputerHit: null,

    startGame(name) {
        this.player1 = new Player(Player.REAL_TYPE, name);
        this.player2 = new Player(Player.BOT_TYPE, "Bot");
        this.currentTurn = this.player1;
        randomShipPlacement(this.player1.gameBoard);
        randomShipPlacement(this.player2.gameBoard);
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
        if (this.computerStrategy === STRATEGY_HUNT) {
            doHuntAttack(this.player1);
        } else if (this.computerStrategy === STRATEGY_SINK) {
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
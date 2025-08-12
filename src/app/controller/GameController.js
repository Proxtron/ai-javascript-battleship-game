import Player from "../model/Player";
import Ship from "../model/Ship";
import { PlayersTurnError } from "../error/Error";


const populateComputerAttacks = (availableComputerAttacks) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
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
    const randomAttackIndex = getRandomAttackIndex(game.availableComputerAttacks);
    const randomAttackX = game.availableComputerAttacks[randomAttackIndex].x;
    const randomAttackY = game.availableComputerAttacks[randomAttackIndex].y;

    game.lastComputerHit = { ...game.availableComputerAttacks[randomAttackIndex] };
    game.availableComputerAttacks.splice(randomAttackIndex, 1);
    game.hitCell(randomAttackY, randomAttackX);

    if (opponent.gameBoard.hasShipAt(randomAttackY, randomAttackX)) {
        game.computerStrategy = STRATEGY_SINK;
    }
}

const doSinkAttack = (opponent) => {
    console.log("doing sink attack");
    const previousXAttack = game.lastComputerHit.x;
    const previousYAttack = game.lastComputerHit.y;

    const nextAttacks = probe(previousXAttack, previousYAttack, opponent);
    console.log(nextAttacks);
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

    availableComputerAttacks: [],
    computerStrategy: STRATEGY_HUNT,
    lastComputerHit: null,

    startGame(name) {
        this.player1 = new Player(Player.REAL_TYPE, name);
        this.player2 = new Player(Player.BOT_TYPE, "Bot");
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
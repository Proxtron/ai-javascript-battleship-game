export default function PlacingGameBoardView(gameBoard) {
    const gameBoardDiv = document.createElement("div");
    gameBoardDiv.classList.add("game-board");

    for(let i = 0; i < gameBoard.sideLength; i++) {
        for(let j = 0; j < gameBoard.sideLength; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell")
            cell.dataset.row = i;
            cell.dataset.col = j;

            if(gameBoard.hasShipAt(i, j)) cell.classList.add("ship-occupied");

            gameBoardDiv.append(cell);
        }
    }

    return gameBoardDiv;
}
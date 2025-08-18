export default function PlacingGameBoardView(gameBoard) {
    const gameBoardDiv = document.createElement("div");
    gameBoardDiv.classList.add("game-board");

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell")
            cell.dataset.row = i;
            cell.dataset.col = j;
            gameBoardDiv.append(cell);
        }
    }

    return gameBoardDiv;
}
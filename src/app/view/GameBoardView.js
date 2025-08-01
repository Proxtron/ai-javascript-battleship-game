export default function GameBoardView(grid) {
    const gameBoardDiv = document.createElement("div");
    gameBoardDiv.classList.add("game-board");
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell")
            if(grid[i][j][0] !== null) cell.classList.add("ship-occupied")

            gameBoardDiv.append(cell);
        }
    }

    return gameBoardDiv;
}
export default function GameBoardView(grid, isTargetedBoard, isHumanPlayer) {
    const gameBoardDiv = document.createElement("div");
    gameBoardDiv.classList.add("game-board");

    if(!isTargetedBoard) {
        gameBoardDiv.classList.add("disabled-game-board")
    }

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell")
            cell.dataset.row = i;
            cell.dataset.col = j;

            if(isHumanPlayer && grid[i][j][0] !== null) cell.classList.add("ship-occupied");
            if(grid[i][j][1] === true) {
                if(grid[i][j][0] === null) cell.innerHTML = "<p class='x-mark'>X</p>";
                else cell.innerHTML = "<p class='x-mark hit-x-mark'>X</p>";
            } 

            gameBoardDiv.append(cell);
        }
    }

    return gameBoardDiv;
}
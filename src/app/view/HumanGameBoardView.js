export default function HumanGameBoardView(gameBoard) {
    const gameBoardDiv = document.createElement("div");
    gameBoardDiv.classList.add("game-board");

    const grid = gameBoard.grid;
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell")
            cell.dataset.row = i;
            cell.dataset.col = j;

            if(gameBoard.hasShipAt(i, j)) cell.classList.add("ship-occupied");

            if(gameBoard.shipSunkAt(i, j)) {
                cell.classList.add("ship-destroyed"); 
                cell.dataset.shipSunk = true;
            } 
            else if (gameBoard.isAttackedAt(i, j)) {
                if(!gameBoard.hasShipAt(i, j)) cell.innerHTML = "<p class='x-mark'>X</p>";
                else cell.innerHTML = "<p class='x-mark hit-x-mark'>X</p>";

                cell.dataset.cellAttacked = true;
            } 

            gameBoardDiv.append(cell);
        }
    }

    return gameBoardDiv;
}
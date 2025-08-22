import GameBoard from "../model/GameBoard";

export default function PlaceableShipView(length, shipOrientation) {
    const div = document.createElement("div");
    div.classList.add("draggable");
    div.draggable = "true";
    div.dataset.length = length;
    for(let i = 0; i < length; i++) {
        const cellDisplayType = shipOrientation === GameBoard.EAST 
            ? "inline-grid-cell"
            : "block-grid-cell";

        div.innerHTML += `<div class="grid-cell placeable-grid-cell ${cellDisplayType}"></div>`;
    }
    return div;
}
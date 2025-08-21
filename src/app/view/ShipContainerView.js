import PlaceableShipView from "./PlaceableShipView";
import GameBoard from "../model/GameBoard";

export default function ShipContainerView(shipOrientation, remainingShipsLengths) {
    const div = document.createElement("div");
    div.id = "ship-container";
    div.classList.add("ship-container");

    shipOrientation === GameBoard.EAST 
        ? div.classList.add("horizontal-ship-container")
        : div.classList.add("vertical-ship-container");

    for(const remainingShipsLength of remainingShipsLengths) {
        div.append(PlaceableShipView(remainingShipsLength, shipOrientation));
    }
    
    return div;
}
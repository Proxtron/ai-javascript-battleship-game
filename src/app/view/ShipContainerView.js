import PlaceableShipView from "./PlaceableShipView";
import GameBoard from "../model/GameBoard";

export default function ShipContainerView(shipOrientation) {
    const div = document.createElement("div");
    div.id = "ship-container";
    div.classList.add("ship-container");

    shipOrientation === GameBoard.EAST 
        ? div.classList.add("horizontal-ship-container")
        : div.classList.add("vertical-ship-container");

    div.append(		
        PlaceableShipView(5, shipOrientation),
        PlaceableShipView(4, shipOrientation),
        PlaceableShipView(3, shipOrientation),
        PlaceableShipView(3, shipOrientation),
        PlaceableShipView(2, shipOrientation)
    );
    return div;
}
import PubSub from "./PubSub";
import PlacementInstructionsView from "../view/PlacementInstructionsView";
import Typed from "typed.js";

const shipPlacementContainer = document.getElementById("ship-placement-screen");

export function showShipPlacementScreen(name) {
    const placementInstructions = PlacementInstructionsView(name);
    shipPlacementContainer.append(placementInstructions);     

    new Typed("#placement-instructions", {
        strings: [`It's time to place your ships, ${name}! Drag and drop and press "R" to rotate.`],
        showCursor: false
    });

}

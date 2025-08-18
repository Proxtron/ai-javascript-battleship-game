import PubSub from "./PubSub";
import PlacementInstructionsView from "../view/PlacementInstructionsView";
import Typed from "typed.js";
import PlacingGameBoardView from "../view/PlacingGameBoardView";
import PlaceRandomlyButtonView from "../view/PlaceRandomlyButtonView";

const shipPlacementContainer = document.getElementById("ship-placement-screen");
const shipPlacementLeftCol = document.getElementById("sp-left-col");
const shipPlacementRightCol = document.getElementById("sp-right-col");
let placeShipRandomlyBtn;

export function showShipPlacementScreen(name) {
    placeShipRandomlyBtn = PlaceRandomlyButtonView();
    shipPlacementLeftCol.append(PlacementInstructionsView(name), placeShipRandomlyBtn);
    shipPlacementRightCol.append(PlacingGameBoardView());
   
    new Typed("#placement-instructions", {
        strings: [`It's time to place your ships, ${name}! Drag and drop and press "R" to rotate.`],
        showCursor: false
    });

    addEventListeners();
}

function addEventListeners() {
    placeShipRandomlyBtn.addEventListener("click", () => {
        PubSub.publish("place_ship_randomly");
    })
}
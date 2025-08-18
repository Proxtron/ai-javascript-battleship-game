import PubSub from "./PubSub";
import PlacementInstructionsView from "../view/PlacementInstructionsView";
import Typed from "typed.js";
import PlacingGameBoardView from "../view/PlacingGameBoardView";
import PlaceRandomlyButtonView from "../view/PlaceRandomlyButtonView";
import game from "./GameController";

const shipPlacementLeftCol = document.getElementById("sp-left-col");
const shipPlacementRightCol = document.getElementById("sp-right-col");
let placeShipRandomlyBtn;

export function showShipPlacementScreen(name) {
    placeShipRandomlyBtn = PlaceRandomlyButtonView();
    shipPlacementLeftCol.append(PlacementInstructionsView(name), placeShipRandomlyBtn);
    renderPlacementGrid(game.player1.gameBoard);
   
    new Typed("#placement-instructions", {
        strings: [`It's time to place your ships, ${name}! Drag and drop and press "R" to rotate.`],
        showCursor: false
    });

    addEventListeners();
}

function renderPlacementGrid(gameBoard) {
    shipPlacementRightCol.innerHTML = "";
    shipPlacementRightCol.append(PlacingGameBoardView(gameBoard));
}

function addEventListeners() {
    placeShipRandomlyBtn.addEventListener("click", () => {
        game.clearHumanShips();
        game.placeHumanShipsRandomly();
        renderPlacementGrid(game.player1.gameBoard);
    })
}
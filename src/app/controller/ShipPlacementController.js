import PlacementInstructionsView from "../view/PlacementInstructionsView";
import Typed from "typed.js";
import PlacingGameBoardView from "../view/PlacingGameBoardView";
import PlaceRandomlyButtonView from "../view/PlaceRandomlyButtonView";
import game from "./GameController";
import PlaceableShipView from "../view/PlaceableShipView";
import GameBoard from "../model/GameBoard";
import RotateButtonView from "../view/RotateButtonView";
import ShipContainerView from "../view/ShipContainerView";

const shipPlacementScreen = document.getElementById("ship-placement-screen");
const shipPlacementLeftCol = document.getElementById("sp-left-col");
const shipPlacementRightCol = document.getElementById("sp-right-col");
const shipPlacementTopSection = document.getElementById("sp-top-section");
const shipContainer = document.getElementById("ship-container");
let placeShipRandomlyBtn;
let rotateBtn;
let currentlyDraggingShipLength;
let currentShipOrientation = GameBoard.EAST;

export function showShipPlacementScreen(name) {
	placeShipRandomlyBtn = PlaceRandomlyButtonView();
    rotateBtn = RotateButtonView();
 
    shipPlacementTopSection.append(
        PlacementInstructionsView(name),
		placeShipRandomlyBtn,
        rotateBtn,
    );

    renderShipContainer(currentShipOrientation);
	renderPlacementGrid(game.player1.gameBoard);

	new Typed("#placement-instructions", {
		strings: [
			`It's time to place your ships, ${name}! Drag and drop your ships onto the grid.`,
		],
		showCursor: false,
	});

	addEventListeners();
}

function renderPlacementGrid(gameBoard, dragOverData) {
	shipPlacementRightCol.innerHTML = "";
	shipPlacementRightCol.append(PlacingGameBoardView(gameBoard, dragOverData));
	addDropTargetEventListeners();
}

function renderShipContainer(currentShipOrientation) {
    shipContainer.innerHTML = "";
    shipContainer.append(
        ShipContainerView(currentShipOrientation)
    );

    shipContainer.querySelectorAll(".draggable").forEach((ship) => {
		ship.addEventListener("dragstart", dragStartHandler);
	});
}

function addDropTargetEventListeners() {
	shipPlacementRightCol.querySelectorAll(".drop-target").forEach((cell) => {
		cell.addEventListener("dragover", dragOverHandler);
		cell.addEventListener("drop", dropHandler);
	});
}

function addEventListeners() {
	placeShipRandomlyBtn.addEventListener("click", () => {
		game.clearHumanShips();
		game.placeHumanShipsRandomly();
		renderPlacementGrid(game.player1.gameBoard);
	});

    rotateBtn.addEventListener("click", rotateBtnHandler);
}

function rotateBtnHandler(event) {
    currentShipOrientation = currentShipOrientation === GameBoard.EAST 
        ? GameBoard.SOUTH 
        : GameBoard.EAST;
    renderShipContainer(currentShipOrientation);
}

function dragStartHandler(event) {
	const shipLength = event.srcElement.dataset.length;
	event.dataTransfer.setData("length", shipLength);
	currentlyDraggingShipLength = shipLength;
}

function dragOverHandler(event) {
	event.preventDefault();

	const dropTarget = event.target;
	const placeX = parseInt(dropTarget.dataset.col);
	const placeY = parseInt(dropTarget.dataset.row);
	const length = parseInt(currentlyDraggingShipLength);

	const dragOverData = game.player1.gameBoard.getDragOverData(
		placeY,
		placeX,
		length,
		currentShipOrientation,
	);


	updateDragOverVisuals(dragOverData);
}

function dropHandler(event) {
	event.preventDefault();

	try {
		const dropTarget = event.target;
		const placeX = parseInt(dropTarget.dataset.col);
		const placeY = parseInt(dropTarget.dataset.row);
		const length = parseInt(event.dataTransfer.getData("length"));

		game.placeSingleHumanShip(length, placeY, placeX, currentShipOrientation);
		renderPlacementGrid(game.player1.gameBoard);
	} catch (error) {
		console.log(error);
	}
}

function updateDragOverVisuals(dragOverData) {
    shipPlacementRightCol.querySelectorAll(".drop-target").forEach((cell) => {
        cell.classList.remove("can-drop", "cannot-drop");
    });

    dragOverData.forEach((cellData) => {
        const cell = shipPlacementRightCol.querySelector(`[data-col="${cellData.x}"][data-row="${cellData.y}"]`);

        if(cell) cellData.canPlace ? cell.classList.add("can-drop") : cell.classList.add("cannot-drop");
    });
}

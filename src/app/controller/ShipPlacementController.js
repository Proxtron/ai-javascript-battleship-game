import PlacementInstructionsView from "../view/PlacementInstructionsView";
import Typed from "typed.js";
import PlacingGameBoardView from "../view/PlacingGameBoardView";
import PlaceRandomlyButtonView from "../view/PlaceRandomlyButtonView";
import game from "./GameController";
import GameBoard from "../model/GameBoard";
import RotateButtonView from "../view/RotateButtonView";
import ShipContainerView from "../view/ShipContainerView";
import StartGameButtonView from "../view/StartGameButtonView";
import PubSub from "./PubSub";
import showToast from "./ToastController";

const shipPlacementScreen = document.getElementById("ship-placement-screen");
const shipPlacementLeftCol = document.getElementById("sp-left-col");
const shipPlacementRightCol = document.getElementById("sp-right-col");
const shipPlacementTopSection = document.getElementById("sp-top-section");
const shipPlacementBottomSection = document.getElementById("sp-bot-section");
const shipContainer = document.getElementById("ship-container");

let placeShipRandomlyBtn;
let rotateBtn;
let startGameButton;
let currentlyDraggingShipLength;
let currentShipOrientation = GameBoard.EAST;
let remainingShipsLengths = [5, 4, 3, 3, 2];

function init() {
    remainingShipsLengths = [5, 4, 3, 3, 2];
    currentShipOrientation = GameBoard.EAST;
}

export function showShipPlacementScreen(name) {
    init();

    shipPlacementScreen.classList.remove("hide")

    renderShipPlacementTopSection(name);
    renderShipPlacementBottomSection();
    renderShipContainer();
	renderPlacementGrid(game.player1.gameBoard);

	addEventListeners();
}

export function hideShipPlacementScreen() {
    shipPlacementScreen.classList.add("hide");
}

function renderShipPlacementTopSection(name) {
    shipPlacementTopSection.innerHTML = "";

    placeShipRandomlyBtn = PlaceRandomlyButtonView();
    rotateBtn = RotateButtonView();
 
    shipPlacementTopSection.append(
        PlacementInstructionsView(name),
		placeShipRandomlyBtn,
        rotateBtn,
    );

    new Typed("#placement-instructions", {
		strings: [
			`It's time to place your ships, ${name}! Drag and drop your ships onto the grid.`,
		],
		showCursor: false,
	});
}

function renderShipPlacementBottomSection() {
    shipPlacementBottomSection.innerHTML = "";
    startGameButton = StartGameButtonView();
    shipPlacementBottomSection.append(startGameButton);
}

function renderPlacementGrid(gameBoard, dragOverData) {
	shipPlacementRightCol.innerHTML = "";
	shipPlacementRightCol.append(PlacingGameBoardView(gameBoard, dragOverData));
	addDropTargetEventListeners();
}

function renderShipContainer() {
    shipContainer.innerHTML = "";
    shipContainer.append(
        ShipContainerView(currentShipOrientation, remainingShipsLengths)
    );

    shipContainer.querySelectorAll(".draggable").forEach((ship) => {
		ship.addEventListener("dragstart", dragStartHandler);
        ship.addEventListener("dragend", () => updateDragOverVisuals());
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
        
        remainingShipsLengths = [];
        renderShipContainer();
	});

    rotateBtn.addEventListener("click", rotateBtnHandler);

    startGameButton.addEventListener("click", startGameHandler);
}

function rotateBtnHandler(event) {
    currentShipOrientation = currentShipOrientation === GameBoard.EAST 
        ? GameBoard.SOUTH 
        : GameBoard.EAST;
    renderShipContainer();
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

	//Prevents unintended elements from triggering a drop
	if(!event.dataTransfer.getData("length")) {
		return;
	}

	try {
		const dropTarget = event.target;
		const placeX = parseInt(dropTarget.dataset.col);
		const placeY = parseInt(dropTarget.dataset.row);
		const length = parseInt(event.dataTransfer.getData("length"));

		game.placeSingleHumanShip(length, placeY, placeX, currentShipOrientation);
		renderPlacementGrid(game.player1.gameBoard);

        updateRemainingShips(length);
        renderShipContainer();
	} catch (error) {
		console.log(error);
	}
}

function updateDragOverVisuals(dragOverData = []) {
    shipPlacementRightCol.querySelectorAll(".drop-target").forEach((cell) => {
        cell.classList.remove("can-drop", "cannot-drop");
    });

    dragOverData.forEach((cellData) => {
        const cell = shipPlacementRightCol.querySelector(`[data-col="${cellData.x}"][data-row="${cellData.y}"]`);

        if(cell) cellData.canPlace ? cell.classList.add("can-drop") : cell.classList.add("cannot-drop");
    });
}

function updateRemainingShips(length) {
    const indexOfLength = remainingShipsLengths.indexOf(length);
    remainingShipsLengths.splice(indexOfLength, 1);
}

function startGameHandler() {
	if(remainingShipsLengths.length === 0) {
		PubSub.publish("start_game");
	} else {
		showToast("Place all your ships before starting the game!");
	}
}
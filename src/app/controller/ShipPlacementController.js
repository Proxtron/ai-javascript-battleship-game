import PlacementInstructionsView from "../view/PlacementInstructionsView";
import Typed from "typed.js";
import PlacingGameBoardView from "../view/PlacingGameBoardView";
import PlaceRandomlyButtonView from "../view/PlaceRandomlyButtonView";
import game from "./GameController";
import PlaceableShipView from "../view/PlaceableShipView";
import GameBoard from "../model/GameBoard";

const shipPlacementLeftCol = document.getElementById("sp-left-col");
const shipPlacementRightCol = document.getElementById("sp-right-col");
let placeShipRandomlyBtn;

export function showShipPlacementScreen(name) {
	placeShipRandomlyBtn = PlaceRandomlyButtonView();
	shipPlacementLeftCol.append(
		PlacementInstructionsView(name),
		placeShipRandomlyBtn,
		PlaceableShipView(5),
		PlaceableShipView(4),
		PlaceableShipView(3),
		PlaceableShipView(3),
		PlaceableShipView(2),
	);
	renderPlacementGrid(game.player1.gameBoard);

	new Typed("#placement-instructions", {
		strings: [
			`It's time to place your ships, ${name}! Drag and drop and press "R" to rotate.`,
		],
		showCursor: false,
	});

	addEventListeners();
}

function renderPlacementGrid(gameBoard) {
	shipPlacementRightCol.innerHTML = "";
	shipPlacementRightCol.append(PlacingGameBoardView(gameBoard));

    shipPlacementRightCol.querySelectorAll(".drop-target").forEach((cell) => {
		cell.addEventListener("dragover", dragOverHandler);
	});

	shipPlacementRightCol.querySelectorAll(".drop-target").forEach((cell) => {
		cell.addEventListener("drop", dropHandler);
	});
}

function addEventListeners() {
	placeShipRandomlyBtn.addEventListener("click", () => {
		game.clearHumanShips();
		game.placeHumanShipsRandomly();
		renderPlacementGrid(game.player1.gameBoard);
	});

	shipPlacementLeftCol.querySelectorAll(".draggable").forEach((ship) => {
		ship.addEventListener("dragstart", dragStartHandler);
	});
}

function dragStartHandler(event) {
	const shipLength = event.srcElement.dataset.length;
	event.dataTransfer.setData("length", shipLength);
}

function dragOverHandler(event) {
	event.preventDefault();
}

function dropHandler(event) {
	event.preventDefault();

	const dropTarget = event.target;
	const placeX = parseInt(dropTarget.dataset.col);
	const placeY = parseInt(dropTarget.dataset.row);
	const length = parseInt(event.dataTransfer.getData("length"));

	game.placeSingleHumanShip(length, placeY, placeX, GameBoard.EAST);

	renderPlacementGrid(game.player1.gameBoard);
}

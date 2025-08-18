import { hideGameScreen, showGameScreen } from "./DOMController";
import { hideEndGameModal, showEndGameModal } from "./EndGameModalController";
import {showNameCollectionScreen, hideNameCollectionScreen} from "./NameCollectionController";
import { showShipPlacementScreen } from "./ShipPlacementController";
import PubSub from "./PubSub";
import game from "./GameController";

export default class App {
    constructor() {
        showNameCollectionScreen();
        this.screenFlow();
        this.gameMessages();
    }

    screenFlow() {
        PubSub.subscribe("name_received", (_, name) => {
            hideNameCollectionScreen();
            game.initalizePlayers(name);
            showShipPlacementScreen(name);
            // showGameScreen(name);
        });

        PubSub.subscribe("game_finished", (_, data) => {
            showEndGameModal(data.winningPlayerName, data.winnerIsHuman);
        });

        PubSub.subscribe("play_again", () => {
            hideEndGameModal();
            hideGameScreen();
            showNameCollectionScreen();
        });
    }

    gameMessages() {
        PubSub.subscribe("place_ship_randomly", () => {
            game.placeHumanShipsRandomly();
        })
    }
}
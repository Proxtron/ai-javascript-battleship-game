import { hideGameScreen, showGameScreen } from "./DOMController";
import { hideEndGameModal, showEndGameModal } from "./EndGameModalController";
import { showNameCollectionScreen, hideNameCollectionScreen } from "./NameCollectionController";
import { showShipPlacementScreen, hideShipPlacementScreen } from "./ShipPlacementController";
import game from "./GameController";
import PubSub from "./PubSub";

export default class App {
    constructor() {
        showNameCollectionScreen();
        this.screenFlow();
    }

    screenFlow() {
        PubSub.subscribe("name_received", (_, name) => {
            hideNameCollectionScreen();
            game.initalizePlayers(name);
            showShipPlacementScreen(name);
            // showGameScreen(name);
        });

        PubSub.subscribe("start_game", () => {
            hideShipPlacementScreen();
            showGameScreen();
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
}
import { hideGameScreen, showGameScreen } from "./DOMController";
import { hideEndGameModal, showEndGameModal } from "./EndGameModalController";
import {showNameCollectionScreen, hideNameCollectionScreen} from "./NameCollectionController";
import PubSub from "./PubSub";

export default class App {
    constructor() {
        showNameCollectionScreen();

        PubSub.subscribe("name_received", (_, name) => {
            hideNameCollectionScreen();
            showGameScreen(name);
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
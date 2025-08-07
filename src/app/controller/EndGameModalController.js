import EndGameModalView from "../view/EndGameModalView";
import PubSub from "./PubSub";

PubSub.subscribe("game_finished", winningPlayer => showEndGameModal(winningPlayer));

const modalContainer = document.getElementById("modal-container");
let closeModalBtn;
let modal;

function showEndGameModal(winningPlayer) {

    modal = EndGameModalView();
    modalContainer.innerHTML = "";
    modalContainer.append(modal);
    modal.showModal();
    
    closeModalBtn = modalContainer.querySelector("#close-modal-btn");
    addEventListeners();
}

function addEventListeners() {
    closeModalBtn.addEventListener("click", () => {
        modal.close();
        modal.remove();
    });
}
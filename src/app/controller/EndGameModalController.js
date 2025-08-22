import EndGameModalView from "../view/EndGameModalView";
import PubSub from "./PubSub";

const modalContainer = document.getElementById("modal-container");
let closeModalBtn;
let modal;

export function showEndGameModal(humanPlayerName, winnerIsHuman) {
    modal = EndGameModalView(humanPlayerName, winnerIsHuman);
    modalContainer.innerHTML = "";
    modalContainer.append(modal);
    modal.showModal();
    
    closeModalBtn = modalContainer.querySelector("#close-modal-btn");
    closeModalBtn.addEventListener("click", () => PubSub.publish("play_again"))
}

export function hideEndGameModal() {
    modal.close();
    modal.remove();
}
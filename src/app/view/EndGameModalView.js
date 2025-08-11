export default function EndGameModalView(name, winnerIsHuman) {

    const modal = document.createElement("dialog");
    modal.classList.add("end-game-modal");

    let endGameTag;
    let endGameSub;
    if(winnerIsHuman) {
        endGameTag = `<h1 class="winner end-game-heading">MISSION ACCOMPLISHED</h1>`;
        endGameSub = `<p class="end-game-sub">Congratulations, ${name}! You have secured victory.</p>`
    } else {
        endGameTag = `<h1 class="loser end-game-heading">ALL UNITS: ABORT MISSION</h1>`;
        endGameSub = `<p class="end-game-sub">Better luck next time, ${name}.</p>`
    }

    modal.innerHTML = `
        ${endGameTag}
        ${endGameSub}
        <button id="close-modal-btn" class="close-modal-btn" >Play again</button>
    `
    return modal;
}
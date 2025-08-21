export default function StartGameButtonView() {
    const button = document.createElement("button");
    button.classList.add("btn", "place-randomly-btn");
    button.innerText = "Start Game";
    return button;
}
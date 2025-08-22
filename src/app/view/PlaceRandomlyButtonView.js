export default function PlaceRandomlyButtonView() {
    const button = document.createElement("button");
    button.classList.add("place-randomly-btn", "btn");
    button.innerText = "Place for me";
    return button;
}
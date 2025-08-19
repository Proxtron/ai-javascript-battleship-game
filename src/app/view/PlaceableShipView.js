export default function PlaceableShipView(length) {
    const div = document.createElement("div");
    div.classList.add("draggable");
    div.draggable = "true";
    for(let i = 0; i < length; i++) {
        div.innerHTML += `<div class="grid-cell placeable-grid-cell"></div>`;
    }
    return div;
}
export default function PlacementInstructionsView() {
    const placementInstructionsContainer = document.createElement("div");
    placementInstructionsContainer.innerHTML = `
        <div id="placement-instructions" class="placement-instructions"></div>
    `
    return placementInstructionsContainer;
}
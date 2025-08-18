export default function NameCollectionView() {
    const form = document.createElement("form");
    form.classList.add("name-collection-form");
    let template = `
        <div class="welcome-heading-container">
            <label id="welcome-heading" class="welcome-heading" for="name"></label>
        </div>

        <input id="name-input" class="name-input" type="text" name="name" required>
        <button type="submit" class="start-game-button btn">Start</button>
    `;

    form.innerHTML = template;
    return form;
}
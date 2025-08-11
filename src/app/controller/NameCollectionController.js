import Typed from "typed.js";
import NameCollectionView from "../view/NameCollectionView";
import PubSub from "./PubSub";

const nameCollectionScreen = document.getElementById("name-collection-screen");
export function showNameCollectionScreen() {
    const nameCollectionForm = NameCollectionView()
    nameCollectionScreen.append(nameCollectionForm);

    new Typed("#welcome-heading", {
        strings: [
            "Welcome, Commander! What is your name?"
        ],
        typeSpeed: 50,
        cursorChar: "_",
    })

    nameCollectionForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(nameCollectionForm);
        const playerName = formData.get("name")
        nameCollectionScreen.classList.add("hide");
        PubSub.publish("name_received", playerName);
    });
}


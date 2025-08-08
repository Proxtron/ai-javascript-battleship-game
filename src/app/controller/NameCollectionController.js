import Typed from "typed.js";
import NameCollectionView from "../view/NameCollectionView";

const nameCollectionScreen = document.getElementById("name-collection-screen");
const nameCollectionForm = NameCollectionView()
const welcomeHeading = nameCollectionForm.querySelector("#welcome-heading");
nameCollectionScreen.append(nameCollectionForm);


new Typed("#welcome-heading", {
    strings: [
        "Welcome, Commander! What is your name?"
    ],
    typeSpeed: 50,
    cursorChar: "_",
})




import rotateSvg from "../../assets/rotate-svgrepo-com.svg";

export default function RotateButtonView() {
    const img = document.createElement("img");
    img.classList.add("rotate-icon")
    img.id = "rotate-icon";
    img.src = rotateSvg;
    return img;
}
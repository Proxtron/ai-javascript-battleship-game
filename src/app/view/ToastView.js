export default function ToastView(message) {
    const div = document.createElement("div");
    div.classList.add("toast");
    div.innerText = message;
    return div;
}
import ToastView from "../view/ToastView";

const toastContainer = document.getElementById("toast-container");

export default function showToast(message) {
    toastContainer.innerHTML = "";
    const toast = ToastView(message);
    toastContainer.append(toast);
    setTimeout(() => {
        toast.classList.add("toast-show");
    }, 1);

    setTimeout(() => {
        toast.classList.remove("toast-show");
    }, 1500)
}
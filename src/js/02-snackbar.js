import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.querySelector(".form");
const fulfilledRef = document.querySelector("[value='fulfilled']");
const rejectedRef = document.querySelector("[value='rejected']");
const delayRef = document.querySelector("[name='delay']");
const submitButtonRef = document.querySelector("button");

submitButtonRef.addEventListener("click", createNewPromise);

function createNewPromise(e) {
    e.preventDefault();

    const delay = delayRef.value;

    if (!(fulfilledRef.checked || rejectedRef.checked)) {
        iziToast.warning({
            message: `Enter a delay time or select a state`,
            position: "topRight",
        });
        return false; 
    }

    if (delay.trim() === "" || delay < 0) {
        iziToast.warning({
            message: `Enter a delay time or select a state`,
            position: "topRight",
        });
        return false; 
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fulfilledRef.checked) {
                resolve();
            } else if (rejectedRef.checked) {
                reject();
            }
        }, delay);
    });

    promise
        .then(() => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: "topRight",
            });
        })
        .catch(() => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: "topRight",
            });
        })
        .finally(() => formRef.reset());
}


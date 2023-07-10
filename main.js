const btnAdd = document.querySelector(".btn-modal__add");
const textTask = document.querySelector("#textTask");
const textDate = document.querySelector("#textDate");
const textArea = document.querySelector("#textArea");
const msgTextTask = document.querySelector(".msg-textTask");
const msgTextDate = document.querySelector(".msg-textDate");
const msgTextArea = document.querySelector(".msg-textArea");

modal.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

// let checkError
let checkError = (element, errorElement, errorMsg) => {
    let isTrue = true;
    if (element.value === "") {
        errorElement.innerHTML = errorMsg;
        isTrue = false;
    } else {
        errorElement.innerHTML = "";
        isTrue = true;
    }
    return isTrue;
};

let formValidation = () => {
    let isValid = true;
    if (!checkError(textTask, msgTextTask, "Task can't be blank")) {
        isValid = false;
    }

    if (!checkError(textDate, msgTextDate, "Date can't be blank")) {
        isValid = false;
    }

    if (!checkError(textArea, msgTextArea, "Desc can't be blank")) {
        isValid = false;
    }

    if (!isValid) {
    } else {
        acceptData();
    }
};

// acceptData
let acceptData = () => {};

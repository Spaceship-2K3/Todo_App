const btnAdd = document.querySelector(".btn-modal__add");
const textTask = document.querySelector("#textTask");
const textDate = document.querySelector("#textDate");
const textArea = document.querySelector("#textArea");
const msgTextTask = document.querySelector(".msg-textTask");
const msgTextDate = document.querySelector(".msg-textDate");
const msgTextArea = document.querySelector(".msg-textArea");
const taskList = document.querySelector("#tasks-list");
let numberTask = document.querySelector("#numberTask");
const btnClearAll = document.querySelector("#btn-Clear-All");
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
        btnAdd.addEventListener("click", (e) => {
            modal.style.display = "none";
        });
        (() => {
            modal.style.display = "flex";
        })();
    } else {
        acceptData();
    }
};

// acceptData
let data = JSON.parse(localStorage.getItem("data")) || [];
let acceptData = () => {
    data.push({
        task: textTask.value,
        date: textDate.value,
        desc: textArea.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    resetModal();
    createTasks();
};

let resetModal = () => {
    textTask.value = "";
    textDate.value = "";
    textArea.value = "";
};

// createTasks
let createTasks = () => {
    taskList.innerHTML = "";
    data.map((element, index) => {
        return (taskList.innerHTML += `
        <li id="${index}" class="task-item">
            <h3 class="task-item__title">${element.task}</h3>
            <p class="task-item__date">${element.date}</p>
            <p class="task-item__desc">
            ${element.desc}
            </p>
            <div class="task-item__controls">
                <i onclick = "editTask(this)" class="fa-regular fa-pen-to-square"></i>
                <i onclick = "actionRemoveTask(this)" class="fa-solid fa-trash-can"></i>
            </div>
        </li>
        
        `);
    });
    totalTask();
};

// editTask
let editTask = (element) => {};

// Khởi tạo mảng tạm để lưu trữ các phần tử đã xóa
let deletedTasks = [];

// actionRemoveTask
let actionRemoveTask = (element) => {
    let selectedElement = element.parentElement.parentElement;
    let selectedId = selectedElement.id;
    let selectedTask = data[selectedId];

    // Thêm phần tử đã xóa vào mảng tạm
    deletedTasks.push(selectedTask);

    selectedElement.innerHTML = `
    <div class="task-item--undo" onclick="undoTask(${selectedId})">
        <h3>Do Not Cancel ?</h3>
        <i class="fa-solid fa-rotate-left"></i>
    </div>
    `;

    // Xóa hàm setTimeout nếu người dùng nhấn undo
    clearTimeout(selectedTask.removeTaskTimeout);

    // Đặt hàm setTimeout để tự động xóa task nếu không có undo
    selectedTask.removeTaskTimeout = setTimeout(function () {
        removeTask(selectedElement);
    }, 4000);
};

// removeTask
let removeTask = (selectedElement) => {
    data.splice(selectedElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    totalTask();
};

// undoTask
let undoTask = (selectedId) => {
    let hadFound;
    hadFound = deletedTasks.find((item, index) => {
        return selectedId === index;
    });
    if (hadFound) {
        // Thêm phần tử đã undo trở lại vào mảng data
        data.splice(selectedId, 0, hadFound);

        document.getElementById(selectedId).innerHTML = `
    <h3 class="task-item__title">${hadFound.task}</h3>
            <p class="task-item__date">${hadFound.date}</p>
            <p class="task-item__desc">
            ${hadFound.desc}
            </p>
            <div class="task-item__controls">
                <i onclick="editTask(this)" class="fa-regular fa-pen-to-square"></i>
                <i onclick="actionRemoveTask(this)" class="fa-solid fa-trash-can"></i>
            </div>
    `;

        // Xóa phần tử đã undo khỏi mảng tạm
        deletedTasks.splice(deletedTasks.indexOf(hadFound), 1);

        // Xóa hàm setTimeout nếu người dùng nhấn undo
        clearTimeout(hadFound.removeTaskTimeout);

        return true;
    } else {
        return false;
    }
};

// totalTask
let totalTask = () => {
    numberTask.innerHTML = data.length;
};

// clearAll
btnClearAll.addEventListener("click", (e) => {
    data = [];
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    totalTask();
});

createTasks();
totalTask();

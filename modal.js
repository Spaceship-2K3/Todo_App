const openModal = document.querySelector(".open-modal");
const modal = document.querySelector("#modal");
const btnClose = document.querySelectorAll(".btn-modal__close-js");
openModal.addEventListener("click", (e) => {
    modal.style.display = "flex";
});
btnClose.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        modal.style.display = "none";
    });
});

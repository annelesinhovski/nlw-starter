// Modal
const buttonSearch = document.querySelector("#page-home main button");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hide");
})


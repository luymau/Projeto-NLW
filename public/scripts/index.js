const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");


buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide"); //Remove o componete que está oculto "hide" no html. ("hide" é uma propriedade no html)
}) 

close.addEventListener("click", () => {
    modal.classList.add("hide");
})
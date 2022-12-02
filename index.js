const body = document.querySelector(".body")
const navBtn = document.querySelector(".nav-btn");
const nav = document.querySelector(".navigation");
const navContainer = document.querySelector(".nav-container");
const navPhone = document.querySelector(".nav-phone");
const modalBtn = document.querySelector(".modal-btn");
const closeBtn = document.querySelector(".close-modal");
const modalText = document.querySelector(".modal-text");
const modalCont = document.querySelector(".modal-container");
const heartBtn = document.querySelector(".heart");
const love = document.querySelector(".how-much");
let howmuch = localStorage.getItem("howmuch");
love.innerText = howmuch;

navBtn.addEventListener("click", function(){
    nav.classList.toggle("nav-seen");
    navPhone.classList.toggle("nav-phone-seen");
});
modalBtn.addEventListener("click", function(){
    modalText.classList.add("modal-seen");
    body.classList.add("body-hidden");
    modalCont.classList.add("modal-cont-seen");
});
closeBtn.addEventListener("click", function(){
    modalText.classList.remove("modal-seen");
    body.classList.remove("body-hidden");
    modalCont.classList.remove("modal-cont-seen");
});
heartBtn.addEventListener("click", function(){
    howmuch++;
    love.innerText=howmuch;
    localStorage.setItem("howmuch",howmuch);
});
const body = document.querySelector(".body");
const header = document.querySelector(".header");
const navBtn = document.querySelector(".nav-btn");
const nav = document.querySelector(".navigation");
const navContainer = document.querySelector(".nav-container");
const navPhone = document.querySelector(".nav-phone");
const modalBtn = document.querySelector(".modal-btn");
const modalBtnContainer = document.querySelector(".modal-btn-cont")
const closeBtn = document.querySelector(".close-modal");
const modalText = document.querySelector(".modal-text");
const modalCont = document.querySelector(".modal-container");
const heartBtn = document.querySelector(".heart");
const love = document.querySelector(".how-much");
const style = document.querySelector(".style");
const nightBtn = document.querySelector(".night-mode");
const links = document.querySelectorAll(".links");
const description = document.querySelectorAll(".description");
let howmuch = localStorage.getItem("howmuch");
let nightmode = localStorage.getItem("night");
love.innerText = howmuch;
let i = 0

if(nightmode=="true"){
    style.setAttribute("href","night.css");
}
links.forEach((el)=>{
    let index = el.getAttribute("index");
    console.log(index);
    el.addEventListener("mouseenter",()=>{
        description[index].classList.remove("hidden");
    })
    el.addEventListener("mouseout",()=>{
        description[index].classList.add("hidden");
    })
})
nightBtn.addEventListener("click",()=>{
    nightmode = localStorage.getItem("night");
    if(nightmode=="true"){
        style.setAttribute("href","style.css");
        localStorage.setItem("night", "false");
    }
    else{
        style.setAttribute("href","night.css");
        localStorage.setItem("night", "true");
    }
})
navBtn.addEventListener("click", function(){
    nav.classList.toggle("nav-seen");
    navPhone.classList.toggle("nav-phone-seen");
    header.classList.toggle("header-seen");
});
modalBtn.addEventListener("click", function(){
    modalText.classList.add("modal-seen");
    body.classList.add("body-hidden");
    modalCont.classList.add("modal-cont-seen");
    modalBtnContainer.style.zIndex = 0;
});
closeBtn.addEventListener("click", function(){
    modalText.classList.remove("modal-seen");
    body.classList.remove("body-hidden");
    modalCont.classList.remove("modal-cont-seen");
    modalBtnContainer.style.zIndex = 67587657;
});
heartBtn.addEventListener("click", function(){
    howmuch++;
    love.innerText=howmuch;
    localStorage.setItem("howmuch",howmuch);
});

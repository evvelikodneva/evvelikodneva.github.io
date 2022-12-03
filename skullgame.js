const skull = document.querySelector(".skull");
const container = document.querySelector(".container");
const startMenu = document.querySelector(".start-menu");
const message = document.querySelector(".message");
const win = document.querySelector(".win");
const easy = document.querySelector(".easy-btn");
const medium = document.querySelector(".medium-btn");
const hard = document.querySelector(".hard-btn");
const choice = document.querySelector(".choice");
const start = document.querySelector(".start");
const goBack = document.querySelector(".go-back");
const restart = document.querySelector(".restart");
let timer;
function randomCoordinate(){
    return (Math.random()*90);
}
function winWin(){
    if(restart.parentElement == message){
        message.removeChild(restart);
    }
    container.classList.add("hidden");
    win.appendChild(restart);
    win.classList.remove("hidden");
    clearTimeout(timer);
    restart.classList.remove("hidden");
    restart.textContent = "Play again!";
}
function gameOver(){
    if(restart.parentElement == win){
        win.removeChild(restart);
    }
    message.appendChild(restart);
    message.classList.remove("hidden");
    container.classList.add("hidden");
    restart.textContent = "restart";
    restart.classList.remove("hidden");
}
function addEasy(){
    skull.classList.add("easy");
    container.classList.add("easy");
}
function removeEasy(){
    skull.classList.remove("easy");
    container.classList.remove("easy");
}
function addMedium(){
    skull.classList.add("medium");
    container.classList.add("medium");
}
function removeMedium(){
    skull.classList.remove("medium");
    container.classList.remove("medium");
}
function addHard(){
    skull.classList.add("hard");
    container.classList.add("hard");
}
function removeHard(){
    skull.classList.remove("hard");
    container.classList.remove("hard");
}
function removeAll(){
    removeEasy();
    removeMedium();
    removeHard();
}
easy.addEventListener("click",()=>{
    addEasy();
    choice.classList.add("hidden");
    startMenu.classList.remove("hidden");
})
medium.addEventListener("click",()=>{
    addMedium();
    choice.classList.add("hidden");
    startMenu.classList.remove("hidden");
})
hard.addEventListener("click",()=>{
    addHard();
    choice.classList.add("hidden");
    startMenu.classList.remove("hidden");
})
goBack.addEventListener("click",()=>{
    startMenu.classList.add("hidden");
    choice.classList.remove("hidden");
    removeAll();
})
start.addEventListener("click",()=>{
    startMenu.classList.add("hidden");
    container.classList.remove("hidden");
    timer = setTimeout(gameOver,15000);
})
restart.addEventListener("click",()=>{
    removeAll();
    choice.classList.remove("hidden");
    message.classList.add("hidden");
    win.classList.add("hidden");
    restart.classList.add("hidden");
    container.style.top = "45%";
    container.style.left = "45%";
})
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    let touchCount = 0;
    function zeroTouches(){
        touchCount = 0;
    }
    let touchTimer;
    touchTimer = setTimeout(touchCount,1000)
    container.addEventListener("touchstart",()=>{
        clearTimeout(touchTimer);
        touchCount+=1;
        if(touchCount==3){
            winWin();
        }
        else{
            container.style.transitionProperty = "top,left";
            container.style.top = randomCoordinate() + "%";
            container.style.left = randomCoordinate() + "%";
            touchTimer = setTimeout(touchCount,1000);
        }
    })
}
else{
    container.addEventListener("mouseenter",()=>{
        container.style.transitionProperty = "top,left";
        container.style.top = randomCoordinate() + "%";
        container.style.left = randomCoordinate() + "%";
    })
    container.addEventListener("click",()=>{
        winWin();
    })
}

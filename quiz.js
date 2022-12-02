const quiz = document.querySelector(".q-and-a");
const ansDiv = document.querySelector(".answers");
const startBtn = document.querySelector(".start");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const finishBtn = document.querySelector(".finish");
const restartBtn = document.querySelector(".restart");
const question = document.querySelector(".question");
const message = document.querySelector(".message");
const win = document.querySelector(".win");
const loss = document.querySelector(".loss");
const qAndA = [
    {
        question: "Choose the cutest kitten",
        answers: [
            {img: "kittenone.jpg", text: "none", correct: false},
            {img: "kittentwo.jpg", text: "none", correct: false},
            {img: "kittenthree.jpg", text: "none", correct: false},
            {img: "kittenfour.jpg", text: "none", correct: false},
            {img: "you.jpg", text: "none", correct: true}
        ]
    },
    {
        question: "Choose the smartest person",
        answers: [
            {img: "none", text: "Galileo Galilei", correct: false},
            {img: "none", text: "Leonardo da Vinci", correct: false},
            {img: "none", text: "Isaac Newton", correct: false},
            {img: "none", text: "you", correct: true}
        ]
    },
    {
        question: "Choose the brightest sun",
        answers: [
            {img: "sunone.jpg", text: "none", correct: false},
            {img: "suntwo.jpg", text: "none", correct: false},
            {img: "sunthree.jpg", text: "none", correct: false},
            {img: "you_sun_en.jpg", text: "none", correct: true}
        ]
    },
    {
        question: "Choose the cutest bunny",
        answers: [
            {img: "bunnyone.jpg", text: "none", correct: false},
            {img: "bunnytwo.jpg", text: "none", correct: false},
            {img: "bunnythree.jpg", text: "none", correct: false},
            {img: "you.jpg", text: "none", correct: true}
        ]
    }
];
let numOfQuestion = 0;
let correctAnswers = [];
let ansChecked;
let buttonPressed=[];
for(let n=0;n<qAndA.length;n++){
    correctAnswers.push(true);
    buttonPressed.push(false);
}
function getRandomNumber(n){
    let rand = Math.ceil(Math.random()*(n+1)) - 1;
    console.log(rand)
    if (rand===-1){
        rand = getRandomNumber(n);
        return rand;
    }
    else{
        return rand;
    }
}
function deleteQAndA(n){
    quiz.classList.add("hidden");
    question.classList.add("hidden");
    ansDiv.classList.add("hidden");
    let allAnsCont = document.querySelectorAll(".all-ans-cont");
    allAnsCont[n].classList.add("hidden");
    console.log(allAnsCont[n]);
}
function makeQandA(){
    let id = 0;
    /*let randomQuestion=[];
    while(qAndA.length>numOfQuestion){
        random.push(numOfQuestion);
        numOfQuestion+=1;
    }
    numOfQuestion = 0
    while(random.length<numOfQuestion){

    }*/
    qAndA.forEach((el)=>{
        let allAnsCont = document.createElement("div");
        allAnsCont.id = numOfQuestion;
        allAnsCont.classList.add("all-ans-cont");
        allAnsCont.classList.add("hidden");
        numOfQuestion += 1;
        let numOfAnswers = 0;
        let random = [];
        while(numOfAnswers < el.answers.length){
            random.push(numOfAnswers);
            numOfAnswers+=1;
        }
        numOfAnswers-=1;
        while(numOfAnswers>=0){
            id+=1;
            let getRA = getRandomNumber(numOfAnswers);
            let randomAnswer = random[getRA];
            random.splice(getRA, 1);
            let answer = document.createElement("input");
            answer.type = "radio";
            answer.name = "answer" + numOfQuestion;
            answer.id = "ans" + id;
            if(el.answers[randomAnswer].correct){
                answer.dataset.correct = el.answers[randomAnswer].correct;
            }
            let ansLabel = document.createElement("label");
            ansLabel.setAttribute("for", answer.id);
            if (el.answers[randomAnswer].img === "none"){
                let ansText = document.createElement("div");
                ansText.textContent = el.answers[randomAnswer].text;
                ansLabel.appendChild(ansText);
            }
            else{
                let ansImg = document.createElement("img");
                ansImg.src = el.answers[randomAnswer].img;
                ansLabel.appendChild(ansImg);
            }
            let ansCont = document.createElement("div");
            ansCont.classList.add("ans-cont");
            ansCont.appendChild(answer);
            ansCont.appendChild(ansLabel);
            allAnsCont.appendChild(ansCont);
            numOfAnswers-=1;
        }
        ansDiv.appendChild(allAnsCont);
    })
    numOfQuestion = 0;
}
function deleteForRemake(){
    quiz.classList.add("hidden");
    question.classList.add("hidden");
    ansDiv.classList.add("hidden");
    let allAnsCont = document.querySelectorAll(".all-ans-cont");
    allAnsCont.forEach((el)=>{
        el.remove();
    })

    /*let ansCont = document.querySelectorAll(".ans-cont");
    let answers = document.querySelectorAll("input [type='radio']");
    let labels = document.querySelectorAll("label");
    answers.forEach((el)=>{
        el.remove();
    })
    labels.forEach((el)=>{
        el.remove();
    })
    ansCont.forEach((el)=>{
        el.remove();
    })*/
}
function addQAndA(n){
    let allAnsCont = document.querySelectorAll(".all-ans-cont");
    allAnsCont[n].classList.remove("hidden");
    quiz.classList.remove("hidden");
    question.textContent = qAndA[n].question;
    question.classList.remove("hidden");
    ansDiv.classList.remove("hidden");
}
function checkAnswers(n){
    let answer = "input[name='answer" + (n+1) + "']";
    let answers = document.querySelectorAll(answer);
    ansChecked = false;
    answers.forEach((el)=>{
        if(el.checked){
            ansChecked = true;
            if(el.dataset.correct){
                correctAnswers[n] = true;
            }
            else{
                correctAnswers[n] = false;
            }
        }
    })
}
startBtn.addEventListener("click", ()=>{
    makeQandA();
    addQAndA(numOfQuestion);
    startBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
});
nextBtn.addEventListener("click", ()=>{
    checkAnswers(numOfQuestion);
    if(ansChecked){
        message.classList.add("hidden");
        deleteQAndA(numOfQuestion);
        numOfQuestion+=1;
        addQAndA(numOfQuestion);
        if(numOfQuestion === qAndA.length - 1){
            nextBtn.classList.add("hidden");
            finishBtn.classList.remove("hidden");
        }
        buttonPressed[numOfQuestion] = true;
    }
    else{
        message.classList.remove("hidden");
    }
    if(numOfQuestion>0){
        prevBtn.classList.remove("hidden");
    }
    console.log(buttonPressed);
});
prevBtn.addEventListener("click", ()=>{
    if(numOfQuestion === qAndA.length - 1){
        nextBtn.classList.remove("hidden");
        finishBtn.classList.add("hidden");
    }
    deleteQAndA(numOfQuestion);
    numOfQuestion-=1;
    if(numOfQuestion === 0){
        prevBtn.classList.add("hidden");
    }
    addQAndA(numOfQuestion);
});
finishBtn.addEventListener("click", ()=>{
    checkAnswers(numOfQuestion);
    if(ansChecked){
        prevBtn.classList.add("hidden");
        finishBtn.classList.add("hidden");
        message.classList.add("hidden");
        deleteQAndA(numOfQuestion);
        if(correctAnswers.includes(false)){
            loss.classList.remove("hidden");
            restartBtn.classList.remove("hidden");
        }
        else{
            win.classList.remove("hidden");
        }
    }
    else{
        message.classList.remove("hidden");
    }
});
restartBtn.addEventListener("click", ()=>{
    restartBtn.classList.add("hidden");
    deleteForRemake();
    numOfQuestion = 0;
    makeQandA();
    addQAndA(numOfQuestion);
    nextBtn.classList.remove("hidden");
    loss.classList.add("hidden");
    for(let n=0;n<qAndA.length;n++){
        buttonPressed[n]=false;
    }
})
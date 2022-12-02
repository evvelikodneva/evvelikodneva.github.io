const start = document.querySelector(".start");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const finish = document.querySelector(".finish");
const restart = document.querySelector(".restart");
const questionContainer = document.querySelector(".question");
const allAnswersContainer = document.querySelector(".answers");
const message = document.querySelector(".message");
let allQuestions;
let allAnswers;
let answerChecked=false;
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
let correctAnswers = [];
let buttonPressed = [];
let i = 0;
while(i<qAndA.length){
    i+=1;
    correctAnswers.push(false); 
    buttonPressed.push(false);
}
let numOfQuestion = 0;
let answerId = 0;
function getRandomNumber(n){
    let rand = Math.ceil(Math.random()*(n+1)) - 1;
    if (rand===-1){
        rand = getRandomNumber(n);
        return rand;
    }
    else{
        return rand;
    }
}
function addQandA(n){
    let question = document.createElement("div");
    question.textContent = qAndA[n].question;
    question.classList.add("questions");
    questionContainer.appendChild(question);
    let answersContainer = document.createElement("div");
    answersContainer.classList.add("all-ans-cont");
    let random = [];
    while(random.length<qAndA[n].answers.length){
        random.push(random.length);
    }
    while(random.length>0){
        let randomIndex = getRandomNumber(random.length-1);
        let randomAnswer = random[randomIndex];
        random.splice(randomIndex,1);
        let answer = document.createElement("div");
        answer.classList.add("ans-cont");
        let inputRadio = document.createElement("input");
        inputRadio.type = "radio";
        inputRadio.id = "ans" + answerId;
        inputRadio.name = "question" + numOfQuestion;
        answerId+=1;
        inputRadio.dataset.correct = qAndA[n].answers[randomAnswer].correct;
        let answerLabel = document.createElement("label");
        answerLabel.setAttribute("for", inputRadio.id);
        if(qAndA[n].answers[randomAnswer].img==="none"){
            let answerText = document.createElement("div");
            answerText.textContent = qAndA[n].answers[randomAnswer].text;
            answerLabel.appendChild(answerText);
        }
        else{
            let answerImg = document.createElement("img");
            answerImg.src = qAndA[n].answers[randomAnswer].img;
            answerLabel.appendChild(answerImg);
        }
        answer.appendChild(inputRadio);
        answer.appendChild(answerLabel);
        answersContainer.appendChild(answer);
        allAnswersContainer.appendChild(answersContainer);
    }
}
function showQandA(n){
    document.querySelector(".q-and-a").classList.remove("hidden");
    questionContainer.classList.remove("hidden");
    allAnswersContainer.classList.remove("hidden");
    allQuestions = document.querySelectorAll(".questions");
    allQuestions[n].classList.remove("hidden");
    allAnswers = document.querySelectorAll(".all-ans-cont");
    allAnswers[n].classList.remove("hidden");
}
function hideQandA(n){
    allQuestions = document.querySelectorAll(".questions");
    allQuestions[n].classList.add("hidden");
    allAnswers = document.querySelectorAll(".all-ans-cont");
    allAnswers[n].classList.add("hidden");
}
function checkAnswers(n){
    allAnswers = document.querySelectorAll("input[name='question"+n+"']");
    allAnswers.forEach((el)=>{
        if(el.checked){
            console.log(el.dataset.correct);
            answerChecked = true;
            correctAnswers[n] = el.dataset.correct;
        }
        console.log(correctAnswers)
    })
}
function deleteQuiz(){
    allQuestions = document.querySelectorAll(".questions");
    allQuestions.forEach((el)=>{
        el.remove();
    })
    allAnswers = document.querySelectorAll(".all-ans-cont");
    allAnswers.forEach((el)=>{
        el.remove();
    })
}
let random = [];
start.addEventListener("click",()=>{
    while(random.length<qAndA.length){
        random.push(random.length);
    }
    let randomIndex = getRandomNumber(random.length-1);
    let randomQuestion = random[randomIndex];
    random.splice(randomIndex,1);
    addQandA(randomQuestion);
    start.classList.add("hidden");
    next.classList.remove("hidden");
    showQandA(numOfQuestion);
});
numOfQuestion = 0;
next.addEventListener("click",()=>{
    checkAnswers(numOfQuestion);
    if(answerChecked){
        message.classList.add("hidden");
        hideQandA(numOfQuestion);
        numOfQuestion+=1
        prev.classList.remove("hidden");
        if(numOfQuestion===0){
            prevBtn.classList.add("hidden");
        }
        if(buttonPressed[numOfQuestion]==false){
            randomIndex = getRandomNumber(random.length-1);
            randomQuestion = random[randomIndex];
            random.splice(randomIndex,1);
            addQandA(randomQuestion);
        }
        showQandA(numOfQuestion);
        buttonPressed[numOfQuestion]=true;
        if(numOfQuestion===qAndA.length-1){
            next.classList.add("hidden");
            finish.classList.remove("hidden");
        }
    }
    else{
        message.classList.remove("hidden");
    }
    answerChecked = false;
});
prev.addEventListener("click",()=>{
    hideQandA(numOfQuestion);
    if(numOfQuestion===qAndA.length-1){
        finish.classList.add("hidden");
        next.classList.remove("hidden");
    }
    numOfQuestion-=1;
    showQandA(numOfQuestion);
});
finish.addEventListener("click",()=>{
    checkAnswers(numOfQuestion);
    prev.classList.add("hidden");
    finish.classList.add("hidden");
    hideQandA(numOfQuestion);
    if(correctAnswers.includes("false")){
        restart.classList.remove("hidden");
        loss.classList.remove("hidden");
    }
    else{
        win.classList.remove("hidden");
    }
});
restart.addEventListener("click",()=>{
    numOfQuestion=0;
    deleteQuiz();
    while(random.length<qAndA.length){
        random.push(random.length);
    }
    let randomIndex = getRandomNumber(random.length-1);
    let randomQuestion = random[randomIndex];
    random.splice(randomIndex,1);
    addQandA(randomQuestion);
    start.classList.add("hidden");
    next.classList.remove("hidden");
    showQandA(numOfQuestion);
    loss.classList.add("hidden");
    restart.classList.add("hidden");
    i=0;
    while(i<qAndA.length){
        buttonPressed[i]=false;
        i+=1;
    }
});
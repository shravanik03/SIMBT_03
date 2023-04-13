const aboutButton = document.querySelector("#about-btn");
const backButton = document.querySelector("#back-btn");
const hintButton = document.querySelector("#hint-btn");
const playHome = document.querySelector("#home-play-btn");
const playAbout = document.querySelector("#about-play-btn");
const home = document.querySelector(".container");
const about = document.querySelector(".about-quiz");
const timeLeft = document.querySelector("#time-left-span");
const score = document.querySelector("#score-span");
const quesNumber = document.querySelector("#ques-no-span");
const question = document.querySelector("#que-span");
const opt1 = document.querySelector("#opt-1-span");
const opt2 = document.querySelector("#opt-2-span");
const opt3 = document.querySelector("#opt-3-span");
const opt4 = document.querySelector("#opt-4-span");
const hintDiv = document.querySelector(".hint-div");
const hint = document.querySelector("#hint-div-p");
const quizContainer = document.querySelector(".question-container");
const display = document.querySelector(".quiz-questions");
const scoreTime = document.querySelector(".top-div");
const nextBtn = document.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const result = document.querySelector("#score-box-span");
const homeButton = document.querySelector("#try-again");
const correctQuestion = document.querySelector("#correct-ques");

aboutButton.addEventListener('click', () => {
    home.classList.add("no-display");
    about.classList.remove("no-display");
});

backButton.addEventListener('click', () => {
    about.classList.add("no-display");
    home.classList.remove("no-display");
});

playHome.addEventListener('click', () => {
    home.classList.add("no-display");
    display.classList.remove("no-display");
    showQuestions(0);
    startTimer(9);
});

playAbout.addEventListener('click', () => {
    about.classList.add("no-display");
    display.classList.remove("no-display");
    showQuestions(0);
    startTimer(9);
});

hintButton.addEventListener('click', () => {
    hintDiv.style.visibility = "visible";
});

homeButton.addEventListener('click',()=>{
    resultBox.classList.add("no-display");
    home.classList.remove("no-display");
});

let questionCount = 1;
let scoreCount = 0;
let index = 0;
let timeCounter = 0;
let timeValue = 10;
let correct = 0;
let wrong = 0;
let na = 0;

function getMultipleRandom(sourceArray, num) {
    sourceArray.sort(() => {
        return Math.random() - 0.5;
    });
    return sourceArray.slice(0, num);
}

nextBtn.addEventListener('click', () => {
    hintDiv.style.visibility = "hidden"
    hintButton.classList.remove("disabled");
    const allOptions = document.querySelector(".option-list");
    for(let i=0;i<4;i++){
        const theOption = allOptions.children.item(i);
        if(theOption.classList.contains("disabled")){
            theOption.classList.remove("disabled");
        }
        if(theOption.classList.contains("answer-right")){
            theOption.classList.remove("answer-right");
        }
        if(theOption.classList.contains("answer-wrong")){
            theOption.classList.remove("answer-wrong");
        }
        if(theOption.children.item(0).classList.contains("display")){
            theOption.children.item(0).classList.remove("display");
        }
        if(theOption.children.item(1).classList.contains("display")){
            theOption.children.item(1).classList.remove("display");
        }
        if(theOption.children.item(2).classList.contains("no-display")){
            theOption.children.item(2).classList.remove("no-display");
        }
    }
    questionCount++;
    if (index < 9) {
        index++;
        showQuestions(index);
        clearInterval(timeCounter);
        startTimer(timeValue);
    }
    else{
        //After last question display Result
        display.classList.add("no-display");
        resultBox.classList.remove("no-display");
        showResult();
    }
});

function showQuestions(x) {
    scoreDisplay();
    quesNumber.innerHTML = questionCount.toString();
    question.innerHTML = quizQues[x].question;
    const optionlist = getMultipleRandom(quizQues[x].options, 4);
    opt1.innerHTML = optionlist[0];
    opt2.innerHTML = optionlist[1];
    opt3.innerHTML = optionlist[2];
    opt4.innerHTML = optionlist[3];
    hint.innerHTML = quizQues[x].hint;
    const option = document.querySelectorAll(".option");
    for(let i=0; i<option.length;i++){
        option[i].setAttribute("onclick", "optionselected(this)");
    }
}

function optionselected(answer){
    clearInterval(timeCounter);
    let userAnswer = answer.lastElementChild.textContent;
    let correctAnswer = quizQues[index].correct;
    const correctOption = answer.children.item(0);
    const wrongOption = answer.children.item(1);
    const optionNumber = answer.children.item(2);
    const allOptions = document.querySelector(".option-list");
    optionNumber.classList.add("no-display");
    if(userAnswer === correctAnswer){
        answer.classList.add("answer-right");
        correctOption.classList.add("display");
        correct++;
        if(hintDiv.style.visibility == 'visible'){
            scoreCount+=5;
        }
        else{
            scoreCount+=10;
        }
        console.log("correct");
    }
    else{
        answer.classList.add("answer-wrong");
        wrongOption.classList.add("display");
        console.log("wrong");
        wrong++;
        //if answer is wrong automatically select correct ans
        for(let i=0;i<4;i++){
            if(allOptions.children.item(i).lastElementChild.textContent == correctAnswer){
                allOptions.children.item(i).classList.add("answer-right");
                allOptions.children.item(i).children.item(2).classList.add("no-display");
                allOptions.children.item(i).children.item(0).classList.add("display");
            }
        }
    }
    //Once user selected disable all options
    hintButton.classList.add("disabled");
    for(let i=0;i<4;i++){
        allOptions.children.item(i).classList.add("disabled");
    }
}

function startTimer(time){
    timeCounter = setInterval(timer, 1000);
    function timer(){
        timeLeft.textContent = time;
        time--;
        if(time<0){
            clearInterval(timeCounter);
            timeLeft.textContent = "0"
            na++;
            nextBtn.click();
        }
    }
}

function scoreDisplay(){
    score.textContent = scoreCount;
}

function showResult(){
    correctQuestion.textContent = correct;
    result.textContent = scoreCount;
}
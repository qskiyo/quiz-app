// CREATE YOUR QUESTIONS

const questions = [
    {
        question: "Who is the odd one here ?",
        answers: [
            {   text: "Aizen Sosuke", correct: false },
            {   text: "Doflamingo", correct: false },
            {   text: "Gon Freecs", correct: true },
            {   text: "Madara Uchiha", correct: false },
        ]
    },
    {  question: "Html, Css, JavaScript, ?",
        answers: [
            {   text: "Python", correct: false },
            {   text: "Git/Github", correct: false },
            {   text: "React", correct: true },
            {   text: "Next.js", correct: false },
        ]
    },
    {  question: "UseState, UseEffect, UseRef, ?",
        answers: [
            {   text: "UseData", correct: false },
            {   text: "UseFlow", correct: false },
            {   text: "UseContext", correct: true },
            {   text: "UseTag", correct: false },
        ]
    },
    {  question: "Which one is odd here",
        answers: [
            {   text: "Apple", correct: true },
            {   text: "LG", correct: false },
            {   text: "Samsung", correct: false },
            {   text: "Hp", correct: false },
        ]
    },
    {  question: "Who is the odd one here ?",
        answers: [
            {   text: "Ayanokouji Kiyotaka", correct: false },
            {   text: "Arisu Sakayanagi", correct: false },
            {   text: "Yamauchi Haruki", correct: true },
            {   text: "Ryuen Kakeru", correct: false },
        ]
    }
];

// SELECT YOUR ELEMENTS

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// Set values
let currentQuestionPosition = 0;
let score = 0;

// START QUIZ FUNCTION

function startQuiz() {
    currentQuestionPosition = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    // Run the show question function
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionPosition];
    let questionNo = currentQuestionPosition + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    progressBar.style.width = `${(questionNo / questions.length) * 100}%`;
    progressText.innerHTML = `Question ${questionNo} of ${questions.length}`;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn")
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
  const  selectedBtn = e.target;
  const  isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        
        button.disabled = true;
    });
     nextButton.style.display = "block";
}

function showScore() {
    resetState();
    progressBar.style.width = "100%";
    progressText.innerHTML = "Quiz complete";
    
      if (score === 5) {
        questionElement.innerHTML = `EXCELLENT SCORE`;
    } else if (score === 4){
        questionElement.innerHTML = `VERY GOOD.`
    } else if (score === 3) {
        questionElement.innerHTML = `GOOD`
    } else if (score === 2) {
        questionElement.innerHTML = `YOU CAN DO BETTER` 
    } else if (score === 1) {
        questionElement.innerHTML = `YOU NEED TO FOCUS`
    } 
     else {
        questionElement.innerHTML = `YOU FAILED, DO BETTER NEXT TIME`
    }

    nextButton.innerHTML = `Play Again`;
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionPosition++;
    if(currentQuestionPosition < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

  nextButton.addEventListener("click", () => {
        if(currentQuestionPosition < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

startQuiz();
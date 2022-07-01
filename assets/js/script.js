let questionContent = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "numbers", "alerts"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within .",
    choices: ["quotes", "parentheses", "curly brackets", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store .",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within __ when being assigned to variables.",
    choices: ["quotes", "commas", "curly brackets", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "console.log", "for loops"],
    answer: "console.log"
  }
];

let rootEl = document.querySelector(".root")
let startGameEl = document.querySelector("#start-game-btn");
let titleEl = document.querySelector(".play-game");
let timerEl = document.querySelector(".timer");
let questionEl = document.querySelector(".question");
let topScoresEl = document.querySelector(".top-scores")

let questionNumber = 0;
let timer = 30;
let score = 0;
let timeInterval;


//to start game
startGameEl.addEventListener("click", function () {
  titleEl.remove();
  timeInterval = setInterval(countdown, 1000);
  timerEl.textContent = timer;
  topScoresEl.textContent = "Score: " + score;
  showQuestion();
});




let printScore = function () {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort(function (a,b) {
    return b.score - a.score;
  }) 

}

let countdown = function () {
  timer--;
  timerEl.textContent = timer;
  if (timer <= 0) {
    endQuiz();
  }
}

let endQuiz = function () {
  timerEl.textContent = "Time's up!";
  clearInterval(timeInterval);
  questionEl.remove();
  endGame();
};


let endGame = function () {
  //if score is in top 5
  printScore();
  let announcement = document.createElement("h2");
  announcement.textContent = "Congratulations! New High Score!"
  rootEl.appendChild(announcement);
  let initialEl = document.createElement("form");
  rootEl.appendChild(initialEl)
  let initialSubmission = document.createElement("input");
  initialSubmission.setAttribute("type", "text");
 
  initialSubmission.classList.add("initialsSub")

  initialEl.appendChild(initialSubmission);
  let submitBtn = document.createElement("button");
  submitBtn.classList.add("submit-btn")
  submitBtn.textContent = "SUBMIT"
  rootEl.appendChild(submitBtn)
  submitBtn.onclick = saveScore;
}

//onclick function on button that points to new function saveScore.
let saveScore = function () {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  let initials = initialsSub.value.trim()
  let newScore = {
    score: score,
    initials: initials
  }
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  printScore();
}


let showQuestion = function () {
  questionEl.innerHTML = "";
  let addedQuestion = document.createElement("h2");
  let currentQuestion = questionContent[questionNumber].title;
  addedQuestion.textContent = currentQuestion;
  questionEl.appendChild(addedQuestion)
  for (let i = 0; i < questionContent[questionNumber].choices.length; i++) {
    let answerChoice = document.createElement("button");
    answerChoice.classList.add("ans-btn");
    answerChoice.textContent = questionContent[questionNumber].choices[i];
    answerChoice.setAttribute("value", questionContent[questionNumber].choices[i]);
    answerChoice.onclick = checkAnswers;
    questionEl.appendChild(answerChoice);
  }
};

let checkAnswers = function () {
  if (this.value !== questionContent[questionNumber].answer) {
    // console.log("wrong test");
    timer -= 10;
    if (timer < 0) {
      endQuiz();
    }
  } else {
    score += 10;
    topScoresEl.textContent = "Score: " + score;
    // console.log("correct test")
    };
  questionNumber++;
  if (questionNumber === questionContent.length) {
    endQuiz();
  } else {
    showQuestion();
  }
};

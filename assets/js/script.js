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
let currentScore;
let timeInterval;


let scoresToBeat = [
  {player: "",
   score: 0
  },
  {player: "",
    score: 0
  },
  {player: "",
    score: 0
  },
  {player: "",
    score: 0
  },
  {player: "",
    score: 0
  }
  ];

//to start game
startGameEl.addEventListener("click", function () {
  titleEl.innerHTML = "";
  timeInterval = setInterval(countdown, 1000);
  timerEl.textContent = timer;
  topScoresEl.textContent = "Score: " + score;
  showQuestion();
});


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

//check if score is in top 5
 //sort top scores array
  scoresToBeat.sort(function (a, b) {
    return b.score - a.score;
  })
 //if current score is greater than scoresToBeat[4].score
  if (score >= scoresToBeat[4].score) {
 //type name 
   let announcement = document.createElement("h2");
   announcement.innerHTML = "<br>New High Score! <br><br>Type your name below to claim your place on the leaderboard!</h2>"; 
   rootEl.appendChild(announcement);
   let initialEl = document.createElement("form");
   rootEl.appendChild(initialEl);
   let initialSubmission = document.createElement("input");
   initialSubmission.setAttribute("type", "text");
   initialEl.appendChild(initialSubmission);
   let submitBtn = document.createElement("button");
   submitBtn.classList.add("submit-btn");
   submitBtn.textContent = "SUBMIT";
   rootEl.appendChild(submitBtn)
//submit name and add to list of top scores in local storage
   submitBtn.addEventListener("click", function (event){
     event.preventDefault();

    currentScore = {
      player: initialSubmission.value.trim(),
      score: score
    };

    scoresToBeat.push(currentScore);
    scoresToBeat.sort(function (a, b) {
      return b.score - a.score;
    })
    localStorage.setItem("scoresToBeat", JSON.stringify(scoresToBeat))
    submitBtn.remove();
    printScores();
  })
    } else {
      let loseScreen = document.createElement("h2");
      loseScreen.innerHTML = "Sorry, you did not place in the top 5. <br> Want to play again?"
      rootEl.appendChild(loseScreen)

      questionNumber = 0;
      timer = 30;
      startGameEl.innerHTML = "TRY AGAIN"
    }
  }



let printScores = function (){
  let olEl = document.createElement("ol");
  for (let j = 0; j < 5; j++) {
    let listEl = document.createElement("li");
    listEl.textContent = scoresToBeat[j].player + " - " + scoresToBeat[j].score;
    olEl.appendChild(listEl);
  }
  rootEl.appendChild(olEl);
  startGameEl.innerHTML = "TRY AGAIN"
  
};
  

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


//code quiz js

// Landing page with start button
// When start button is clicked remove welcome msg and append question 1
// 	add event listener to button
// 		activity12
// Start timer
// User answers question - read chosen element, data value, compare to answer key
// If correct, next question
// If incorrect, - 10 seconds from timer, and then next question

// End of quiz
// Add up user score
// Display input for user to type their intials
// Second html and display user name and score - read object from local storage



/*
gives the element in html a variable name for Javascript
let title = document.querySelector(".play-game");

creates new element
let addedInfo = document.createElement("h2");

gives element text
addedInfo.textContent = "Click the button below to play the game!";
  
places element on the html
title.appendChild(addedInfo);
  
gives classes to element
addedInfo.classList.add("center", "color");
*/


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

let topScoresEl = document.querySelector(".top-scores")
let rootEl = document.querySelector("main");
let titleEl = document.querySelector(".play-game");
let startGameEl = document.querySelector("#start-game-btn");
let questionSpaceEl = document.querySelector(".question");



let counter = 0;



startGameEl.addEventListener("click", function () {
  titleEl.remove();
  return startQuestions();
})

let startQuestions = function () {
  
  let addedQuestion = document.createElement("h2");
  let currentQuestion = questionContent[counter].title
  addedQuestion.textContent = currentQuestion;
  rootEl.appendChild(addedQuestion)
  for (let i = 0; i < questionContent[counter].choices.length; i++) {
    let answerChoice = document.createElement("button");
    answerChoice.classList.add("ans-btn");
    answerChoice.textContent = questionContent[counter].choices[i]
    addedQuestion.appendChild(answerChoice);
    if (answerChoice.textContent === questionContent[counter].answer) {
      answerChoice.classList.add("correct-answer");
    } else {
      answerChoice.classList.add("wrong-answer");
    }
  }
  //score function 
  ".ans-btn".addEventListener("click", calculateScore());//score function

  } // else {
    // return topScores()
  // }



let calculateScore = function () {
  if (element.classList.contains("correct-answer")) {
    console.log("Hell Yeah")
  }

  // counter++;
  // if (counter < questionContent.length) {
  //   return startQuestions()
}


//score function

//top scores function with play again button.


//try again button needs to refresh page
//window.location.reload();



//answering a question replaces the text with the next question in the array




var timer = document.querySelector(".timer");
var head = document.querySelector(".mainhead");
var startButton = document.querySelector(".startButton");
var questionTxt = document.querySelector(".questionText");

var timenum = 10;
var time = timenum;
var losses = localStorage.getItem("losses");
var wins = localStorage.getItem("wins");
var amountOfButtons = 5;
var button = document.createElement("button");
var questionNum = 0;

// this array will hold objects of question and answers so that one index in the questions array can hold multiple answers.
var questions = [
  {
    question: "How old is JavaScript?",
    answers: [
      { answer: "10 years old", isTrue: false },
      { answer: "17 years old", isTrue: false },
      { answer: "27 years old", isTrue: true },
      { answer: "30 years old", isTrue: false },
    ],
  },
];

console.log(questions[0].answers.length);

startButton.addEventListener("click", function (event) {
  startButton.style.display = "none";
  timer.textContent = time;
  startTime();
  startGame();
});

function startTime() {
  var timerInterval = setInterval(function () {
    time--;
    timer.textContent = time;

    if (time === 0) {
      clearInterval(timerInterval);
      startButton.style.display = "inline";
      clearBtns();
      questionNum = 0;
      time = timenum;
      questionTxt.textContent = "Game over time is up!";
      startButton.textContent = "Restart";
    }
  }, 1000);
}

function startGame() {//this function get the question from the questions array and all the answers from the question array.
  let startingP = document.querySelector("#mainP");
  startingP.style.display = "none";
  let buttonAmount = questions[questionNum].answers.length;
  let answers = questions[questionNum].answers;
  questionTxt.textContent = questions[questionNum].question;

  for (i = 0; i < buttonAmount; i++) {
    let isTrue = questions[questionNum].answers[i].isTrue;
    let button = document.createElement("button");

    button.setAttribute("class", "quiz-button" + i);
    button.setAttribute("id", isTrue);
    head.appendChild(button);
    button.textContent = answers[i].answer;
    button.style.display = "flex";
    button.addEventListener("click", function (event) {
      let btnId = button.getAttribute("id");
      clearBtns();
      // console.log(btnId);
      if (btnId === "true") {
        console.log("Right answer!");
      } else {
        console.log("Wrong answer");
      }
    });
  }
  questionNum++
}


function clearBtns(){//this function clears the question buttons.
  for ( i = 0; i < 4; i++){
  let quizBtn = document.querySelector(".quiz-button"+i);
  quizBtn.style.display = "none";
  }
}

      
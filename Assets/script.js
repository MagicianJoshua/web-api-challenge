

var gameover = false;
var timer = document.querySelector(".timer");
var resetButton = document.querySelector(".resetButton");
var head = document.querySelector(".mainhead");
var startButton = document.querySelector(".startButton");
var questionTxt = document.querySelector(".questionText");
var initialForm = document.querySelector(".initialForm");
var highscoretxt = document.querySelector(".Highscore")
var initials = document.querySelector(".initials");
var initSubmit = document.querySelector(".submit");
var initH2 = document.querySelector(".h2Initial")
var scoreTxt = document.querySelector(".score");
var button = document.createElement("button");
var highScoreNum = localStorage.getItem("highScore");
var initialsLocal = localStorage.getItem("initials");
var score = 0;
var time = 0;
var questionNum = 0;
highscoretxt.textContent = "HighScore: " + initialsLocal + " : " + highScoreNum;


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

  {
    question:
      "What will this code output?: var num = 10; \n console.log(typeof num);",
    answers: [
      { answer: "bool", isTrue: false },
      { answer: "string", isTrue: false },
      { answer: "undefined", isTrue: false },
      { answer: "number", isTrue: true },
    ],
  },
  {
    question:
      "What is javascript main purpose in todays industry?",
    answers: [
      { answer: "Cyber Security", isTrue: false },
      { answer: "Storing data", isTrue: false },
      { answer: "Manipulating websites", isTrue: true },
      { answer: "Making games", isTrue: false },
    ],
  },
  {
    question:
      "What is the comparison operator to check if a var is equal to another var",
    answers: [
      { answer: "===", isTrue: true },
      { answer: "!=", isTrue: false },
      { answer: "=", isTrue: false },
      { answer: "==", isTrue: false },
    ],
  },
  {
    question:
      "Is javascript dynamically typed or statically typed?",
    answers: [
      { answer: "static", isTrue: false },
      { answer: "dynamic", isTrue: true },
    ],
  },
  {
    question:
      "How do you create a for loop?",
    answers: [
      { answer: "for (i = 0; i > 10; i++", isTrue: false },
      { answer: "for (i = 0; i < 10; i++", isTrue: true },
      { answer: "for (i = 0; i > 10; i--", isTrue: false },
    ],
  },
];



resetButton.addEventListener("click", function(){
  localStorage.setItem("highScore", 0);
  localStorage.setItem("initials", "")
  highScoreNum = localStorage.getItem("highScore");
  initialsLocal = localStorage.getItem("initials");
  highscoretxt.textContent = "HighScore: " + initialsLocal + " : " + highScoreNum;
})

startButton.addEventListener("click", function (event) {
  highScoreNum = localStorage.getItem("highScore");
  initialsLocal = localStorage.getItem("initials");
  highscoretxt.textContent = "HighScore: " + initialsLocal + " : " + highScoreNum;
  gameover = false;
  score = 0;
  time = 10;
  resetButton.style.display = "none";
  startButton.style.display = "none";
  timer.textContent = time;
  startTime();
  startGame();
});

initSubmit.addEventListener("click", function(event){
  event.preventDefault();
  console.log(initials.value);
  initSubmit.style.display = "none";
  startButton.style.display = "flex";
  startButton.textContent = "Play again";
  initialForm.style.display = "none";
  resetButton.style.display = "flex";
  highscoretxt.textContent = "HighScore: " + initialsLocal + ":" + highScoreNum;
  questionTxt.textContent = "Thank you for submitting you initials!";
  if (score > highScoreNum){
    localStorage.setItem("highScore", score);
    highscoretxt.textContent = "Highscore: "+highScoreNum;
    localStorage.setItem("initials", initials.value);
  }
  highScoreNum = localStorage.getItem("highScore");
  initialsLocal = localStorage.getItem("initials");
  highscoretxt.textContent = "HighScore: " + initialsLocal + " : " + highScoreNum;
})

function startTime() {
  let timeup = false;
  var timerInterval = setInterval(function () {
    time--;
    timer.textContent = time;

    if (time <= 0 || gameover === true) {
      clearInterval(timerInterval);
      timeup = true
      gameOver();
      clearBtns();
    }
    console.log(time);
  }, 1000);
}

function startGame() {
  //this function get the question from the questions array and all the answers from the question array.
  if (questions.length >= questionNum + 1 ) {
    //you have to add a plus one because questionNum starts at 0 for the index of the arrays but to compare it to the length you want it to start at 1.
    let startingP = document.querySelector("#mainP");
    let buttonAmount = questions[questionNum].answers.length;
    let answers = questions[questionNum].answers;
    questionTxt.textContent = questions[questionNum].question;
    startingP.style.display = "none";
    for (i = 0; i < buttonAmount; i++) {
      let isTrue = questions[questionNum].answers[i].isTrue;
      let button = document.createElement("button");
      button.setAttribute("class", "quiz-button" + i); //this is naming the buttons a class + i which allows me to loop through the html file and get rid of them afterwards
      button.setAttribute("id", isTrue); //this is assigning an id to the buttons either true of false, to set the correct answer
      head.appendChild(button); //this is appending the buttons to the head of the documents
      button.textContent = answers[i].answer; //this is changing the text of the buttons to one of the answers provided to us by the answer array in the questions array
      button.style.display = "flex"; //this is setting the display type of all the buttons shown
      button.style.color = "white";
      button.style.background = "blue";
      button.style.fontWeight = "bolder";
      button.style.borderRadius = "10px"
      button.style.justifyContent = "center"


      button.addEventListener("click", function () {
        //this adds an event to the buttons that are being generated.
        let btnId = button.getAttribute("id");

        // console.log(btnId);

        if (btnId === "true") {
          console.log("Right answer!");
          score = score + 10 * time;
          time = time + 5;
          timer.textContent = time;
          clearBtns();
          questionNum++;
          startGame();
          scoreTxt.textContent = "Score: " + score;
        } else {
          console.log("Wrong answer");
          clearBtns();
          questionNum++;
          startGame();
          time = time - 5;
        }
      });
    }
  } else {
    gameOver();
  }
}
//this function clears the question buttons.
function clearBtns() {
  let ansArray = questions[questionNum].answers;  
  for (i = 0; i < ansArray.length; i++) {
    let quizBtn = document.querySelector(".quiz-button" + i);
    quizBtn.remove();
  }
}

//this function is triggered when either time runs out or there are no more question left
function gameOver() {
  questionTxt.textContent =
  "You have finished the game with a score of: " + score;
  timer.remove();
  questionNum = 0;
  initialForm.style.display = "flex";
  initSubmit.style.display = "flex";
  gameover = true;
}


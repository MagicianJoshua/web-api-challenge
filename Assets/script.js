var timer = document.querySelector(".timer");
var head = document.querySelector(".mainhead");
var startButton = document.querySelector(".startButton");
var questionTxt = document.querySelector(".questionText");
var highscoreTxt = document.querySelector(".initialForm");
var initials = document.querySelector(".initials");
var initSubmit = document.querySelector(".submit");
var initH2 = document.querySelector(".h2Initial")
var scoreTxt = document.querySelector(".score");
var button = document.createElement("button");
var highScore = localStorage.getItem("highScore");
var gameDone = false;


var score = 0;
var timenum = 10;
var time = timenum;
var amountOfButtons = 5;
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
];

startButton.addEventListener("click", function (event) {
  startButton.style.display = "none";
  timer.textContent = time;
  startTime();
  startGame();
});

initSubmit.addEventListener("click", function(event){
  event.preventDefault();
  initH2.textContent = "Thank you for submitting you initials!";

  console.log(initials.value + score);
})

function startTime() {
  let timeup = false;
  var timerInterval = setInterval(function () {
    time--;
    timer.textContent = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      timeup = true
      gameOver();
    }
    if (timeup === true && gameDone != true){// did this if statement because it was throwing an error about there being no buttons to remove when the game was finished.
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


      button.addEventListener("click", function () {
        //this adds an event to the buttons that are being generated.
        let btnId = button.getAttribute("id");

        // console.log(btnId);

        if (btnId === "true") {
          console.log("Right answer!");
          score = score + 5 * time;
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
  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }
  questionNum = 0;
  highscoreTxt.style.display = "flex";
  gameDone = true;
}



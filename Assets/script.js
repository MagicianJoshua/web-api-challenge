var timer = document.querySelector(".timer");
var head = document.querySelector(".mainhead");
var startButton = document.querySelector(".startButton");
var time = 10;
var losses = localStorage.getItem("losses");
var wins = localStorage.getItem("wins");
var amountOfButtons = 5;
var button = document.createElement("button");


// we need a way to have right answers and wrong answers be displayed at the same time
var questions = ["is javascript dynamically typed language or staticly typed language"];
var rightAnswers = ["dynamically typed"];
var wrongAnswers = ["statically typed"];

startButton.addEventListener("click", function (event) {
  startButton.style.display = "none" ;
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
    }
  }, 1000);
}

function startGame(){
    for (i = 0; i < amountOfButtons; i++){
        let button = document.createElement("button");
        button.setAttribute("id", "quiz-button");
        head.appendChild(button);
        button.textContent = "testing";
        button.style.display = "flex";
    }
    
}
function initializeQuestions() {

}

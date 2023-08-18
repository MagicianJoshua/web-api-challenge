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

  {
    question:"What will this code output?: var num = 10; \n console.log(typeof num);",
    answers: [
      {answer: "bool", isTrue:false},
      {answer: "string", isTrue:false},
      {answer: "undefined",isTrue:false},
      {answer: "number", isTrue:true},
    ],
  },
  
];





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

    if (time <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}





function startGame() {//this function get the question from the questions array and all the answers from the question array.
  
  let startingP = document.querySelector("#mainP");
  let buttonAmount = questions[questionNum].answers.length;
  let answers = questions[questionNum].answers;
  
  questionTxt.textContent = questions[questionNum].question;
  startingP.style.display = "none";

  for (i = 0; i < buttonAmount; i++) {
    let isTrue = questions[questionNum].answers[i].isTrue;
    let button = document.createElement("button");

    button.setAttribute("class", "quiz-button" + i);//this is naming the buttons a class + i which allows me to loop through the html file and get rid of them afterwards
    button.setAttribute("id", isTrue);//this is assigning an id to the buttons either true of false, to set the correct answer
    head.appendChild(button);//this is appending the buttons to the head of the documents
    button.textContent = answers[i].answer;//this is changing the text of the buttons to one of the answers provided to us by the answer array in the questions array
    button.style.display = "flex";//this is setting the display type of all the buttons shown

    button.addEventListener("click", function () {//this adds an event to the buttons that are being generated.
      let btnId = button.getAttribute("id");
      
      // console.log(btnId);
      if (btnId === "true") {
        console.log("Right answer!");
        
        clearBtns();
       questionNum++
       startGame();
      } else {
        console.log("Wrong answer");
        clearBtns();
        
        question++
        startGame();
        
      }
    });
  }
}


function clearBtns(){//this function clears the question buttons.
  let ansArray = questions[questionNum].answers;
  for ( i = 0; i < ansArray.length; i++){
  let quizBtn = document.querySelector(".quiz-button"+i);
  quizBtn.remove();
  }
}



function gameOver(){
  if (time <= 0){
    questionTxt.textContent = "Game over time is up!";
    startButton.textContent = "Restart";
  }else {
    questionTxt.textContent = "You have finished the game with a score of:";
  }
      startButton.style.display = "inline";
      clearBtns();
      questionNum = 0;
      time = 10;
      
}

      
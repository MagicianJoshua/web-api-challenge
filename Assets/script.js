var timer = document.querySelector(".timer");
var startButton = document.querySelector(".startButton");

startButton.addEventListener("click", function(event){
    timer.textContent = 100;
})


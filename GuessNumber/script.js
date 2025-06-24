const container = document.querySelector(".container");
const check = document.querySelector(".check-btn");
const inputBtn = document.querySelector(".input-btn");
const start = document.querySelector(".start");
const number = document.querySelector(".number");
let secretNum = Math.floor(Math.random() * 20) + 1;
const score = document.querySelector(".score");
const tryAgain = document.querySelector(".again");
let highScore = document.querySelector(".highscore");
let point = 100;
let highPoint = 0;

check.onclick = function () {
  const inputValue = Number(inputBtn.value);
  // when there is no input value
  if (!inputValue) {
    start.innerHTML = "⛔️ No Number...";

    // when player is win
  } else if (inputValue === secretNum) {
    (start.innerHTML = "🎉 Correct Number...🎉"),
      (number.innerHTML = secretNum);
    container.style.backgroundColor = "lightgreen";
    number.style.width = "200px";
    number.style.animation = "grow linear 4s infinite";
    if (point > highPoint) {
      highPoint = point;
      highScore.innerHTML = highPoint;
    }

    //when input value is too high
  } else if (inputValue > secretNum) {
    if (point > 1) {
      start.innerHTML = "📈 Too High!";
      point = point - 10;
      score.innerHTML = point;
    } else {
      start.innerHTML = "💥 You lost the game";
    }

    //when input value is too low
  } else if (inputValue < secretNum) {
    if (point > 1) {
      start.innerHTML = "📉 Too Low!";
      point = point - 10;
      score.innerHTML = point;
    } else {
      start.innerHTML = "💥 You lost the game";
    }
  }
};

// when reloud the game by klick again

tryAgain.onclick = function () {
  point = 100;
  Math.floor(Math.random() * 20) + 1;
  score.innerHTML = point;
  number.innerHTML = "?";
  inputValue = "";
  container.style.backgroundColor = "lightgray";
  number.style.width = "150px";
  number.style.animation = "none";
  start.innerHTML = "Start Guessing...";
};

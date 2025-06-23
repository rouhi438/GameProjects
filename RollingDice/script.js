//In this game If one of the rolls is equal to 1, or if a player chooses to save their current score
//in the total score, the next player starts the game. In the end, the player whose total
// score reaches to 100 scores WINS the game.

const playaerNumber1 = document.querySelector(".player--0");
const PlayerNumber2 = document.querySelector(".player--1");
const totalScorePlyer1 = document.querySelector("#score-0");
const totalScorePlyer2 = document.querySelector("#score-1");
const diceImg1 = document.querySelector(".dice1");
const diceImg2 = document.querySelector(".dice2");
const currentScorePlayer1 = document.getElementById("current--0");
const currentScorePlayer2 = document.getElementById("current--1");
const nextPlayer = document.querySelector(".next");

const btnNew = document.querySelector(".new-game");
const btnRoll = document.querySelector(".roll-btn");
const btnHold = document.querySelector(".hold-btn");

let scores;
let currentScore;
let activePlayer;
let playing;

// Initializing elements to start the game

const initial = function () {
  totalScorePlyer1.textContent = 0;
  totalScorePlyer2.textContent = 0;

  diceImg1.classList.add("hidden");
  diceImg2.classList.add("hidden");
  nextPlayer.classList.add("hidden");

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  totalScorePlyer1.textContent = 0;
  totalScorePlyer2.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;

  playaerNumber1.classList.remove("player-winner");
  PlayerNumber2.classList.remove("player-winner");
  playaerNumber1.classList.add("active-player");
  PlayerNumber2.classList.remove("active-player");
};
initial();

// Switch to another player

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  playaerNumber1.classList.toggle("active-player");
  PlayerNumber2.classList.toggle("active-player");
  nextPlayer.classList.remove("hidden");
};
// rolling the dices

btnRoll.addEventListener("click", function () {
  if (playing) {
    const diceA = Math.floor(Math.random() * 6) + 1;
    const diceB = Math.floor(Math.random() * 6) + 1;

    diceImg1.classList.remove("hidden");
    diceImg2.classList.remove("hidden");
    nextPlayer.classList.add("hidden");
    diceImg1.src = `images/dice-${diceA}.png`;
    diceImg2.src = `images/dice-${diceB}.png`;

    if (diceA !== 1 && diceB !== 1) {
      currentScore += diceA + diceB;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Save current scores to Total score

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active-player");
    } else {
      switchPlayer();
    }
  }
});

// Rerstart the game and back to initializing

btnNew.addEventListener("click", initial);

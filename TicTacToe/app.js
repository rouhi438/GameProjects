//
const gameBoard = document.querySelector(".board");
const statusGame = document.querySelector(".status");
let currentPlayer = "X";
let boardStatus = ["", "", "", "", "", "", "", "", ""];

const winningStatus = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

function createBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.index = i;
    if (i < 3) box.style.borderTop = "none";
    if (i > 5) box.style.borderBottom = "none";
    if (i % 3 === 0) box.style.borderLeft = "none";
    if (i % 3 === 2) box.style.borderRight = "none";
    box.addEventListener("click", handlerClick);
    gameBoard.appendChild(box);
  }
}

function handlerClick(e) {
  const index = e.target.dataset.index;
  if (boardStatus[index] !== "") return;
  boardStatus[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  let result = checkWinner();
  if (result) {
    if (typeof result === "object") {
      endGame(result.winner, result.combo);
    } else {
      endGame(result, null);
    }
    return;
  }
  systemMove();
}
createBoard();

//----------

function checkWinner() {
  for (let cell of winningStatus) {
    const [a, b, c] = cell;
    if (
      boardStatus[a] &&
      boardStatus[a] === boardStatus[b] &&
      boardStatus[a] === boardStatus[c]
    ) {
      return { winner: boardStatus[a], combo: cell };
    }
  }
  return boardStatus.includes("") ? null : "tie";
}

//---------

function endGame(winner, cell = null) {
  if (winner === "tie") {
    statusGame.textContent = "Tie!";
  } else {
    statusGame.textContent = `${winner} wins!`;
    if (cell) {
      drawWinnerLine(cell);
    }
  }
  gameBoard
    .querySelectorAll(".box")
    .forEach((element) => element.removeEventListener("click", handlerClick));
}
//-- draw line
function drawWinnerLine(winningCombo) {
  const existingLines = document.querySelectorAll(".winner-line");
  existingLines.forEach((line) => line.remove());
  const [a, b, c] = winningCombo;
  const box1 = document.querySelector(`.box[data-index='${a}']`);
  const box2 = document.querySelector(`.box[data-index='${b}']`);
  const box3 = document.querySelector(`.box[data-index='${c}']`);

  [box1, box2, box3].forEach((box) => box.classList.add("winner-cell"));
  const line = document.createElement("div");
  line.classList.add("winner-line");

  //--kind of line conditions
  if (winningCombo[0] === 0 && winningCombo[1] === 1 && winningCombo[2] === 2) {
    line.classList.add("horizontal");
    line.style.top = "50px";
  } else if (
    winningCombo[0] === 3 &&
    winningCombo[1] === 4 &&
    winningCombo[2] === 5
  ) {
    line.classList.add("horizontal");
    line.style.top = "175px";
  } else if (
    winningCombo[0] === 6 &&
    winningCombo[1] === 7 &&
    winningCombo[2] === 8
  ) {
    line.classList.add("horizontal");
    line.style.top = "295px";
  } else if (
    winningCombo[0] === 0 &&
    winningCombo[1] === 3 &&
    winningCombo[2] === 6
  ) {
    line.classList.add("vertical");
    line.style.left = "53px";
  } else if (
    winningCombo[0] === 1 &&
    winningCombo[1] === 4 &&
    winningCombo[2] === 7
  ) {
    line.classList.add("vertical");
    line.style.left = "175px";
  } else if (
    winningCombo[0] === 2 &&
    winningCombo[1] === 5 &&
    winningCombo[2] === 8
  ) {
    line.classList.add("vertical");
    line.style.left = "299px";
  } else if (
    winningCombo[0] === 0 &&
    winningCombo[1] === 4 &&
    winningCombo[2] === 8
  ) {
    line.classList.add("radius-left");
    line.style.left = "16px";
    line.style.top = "10px";
  } else if (
    winningCombo[0] === 2 &&
    winningCombo[1] === 4 &&
    winningCombo[2] === 6
  ) {
    line.classList.add("radius-right");
    line.style.right = "16px";
    line.style.top = "10px";
  }
  gameBoard.appendChild(line);
}

//--------hard --
function checkWinnerMove(player) {
  for (let combo of winningStatus) {
    const [a, b, c] = combo;
    const values = [boardStatus[a], boardStatus[b], boardStatus[c]];

    let playerCount = 0;
    let emptyIndex = -1;
    for (let i = 0; i < 3; i++) {
      if (values[i] === player) {
        playerCount++;
      } else if (values[i] === "") {
        emptyIndex = i;
      }
    }
    if (playerCount === 2 && emptyIndex !== -1) {
      return combo[emptyIndex];
    }
  }
  return null;
}

//------
function systemMove() {
  let move = checkWinnerMove("O");
  if (move === null) move = checkWinnerMove("X");
  if (move === null && boardStatus[4] === "") move = 4;

  const corners = [0, 2, 6, 8].filter((i) => boardStatus[i] === "");
  if (move === null && corners.length > 0) {
    move = corners[Math.floor(Math.random() * corners.length)];
  }

  if (move === null) {
    const emptyIndexes = boardStatus
      .map((val, idx) => (val === "" ? idx : null))
      .filter((val) => val !== null);
    if (emptyIndexes.length === 0) return;
    move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  }
  boardStatus[move] = "O";
  const box = document.querySelector(`.box[data-index='${move}']`);
  box.textContent = "O";

  let result = checkWinner();
  if (result) {
    if (typeof result === "object") {
      endGame(result.winner, result.combo);
    } else {
      endGame(result, null);
    }
    return;
  }

  currentPlayer = "X";
}
//--------restart ---
const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", () => {
  boardStatus = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  statusGame.textContent = "";
  document.querySelectorAll(".winner-line").forEach((line) => line.remove());
  document.querySelectorAll(".box.winner-cell").forEach((box) => {
    box.classList.remove("winner-cell");
  });
  createBoard();
});

//---------Sound Control ---
const modeSound = new Audio("./asset/mode.wav");
// --------- Mode Control ---------
const mode = document.getElementById("mode");
const text = document.querySelector(".mode-text");
const icon = document.querySelector(".icon");

let night = true;

mode.addEventListener("click", () => {
  night = !night;
  modeSound.play();

  if (night) {
    document.body.className = "night";
    icon.className = "bi bi-sun-fill icon";
    text.textContent = "Light Mode";
    mode.classList.remove("light");
  } else {
    document.body.className = "light";
    icon.className = "bi bi-moon-stars-fill icon";
    text.textContent = "Night Mode";
    mode.classList.add("light");
  }
});

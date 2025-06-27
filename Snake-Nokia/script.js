const container = document.getElementById("snake-container");
const food = document.getElementById("food");
const scoreDisplay = document.getElementById("score");
const gameScreen = document.querySelector(".screen");

let snake = [{ x: 100, y: 100 }];
let direction = "right";
let nextDirection = "right";
const gridSize = 10;
let foodX, foodY;
let score = 0;
let speed = 300;
let gameLoop = null;
let startX = 100;
let startY = 100;

function placeFood() {
  const maxX = Math.floor(gameScreen.clientWidth - gridSize) / gridSize;
  const maxY = Math.floor(gameScreen.clientHeight - gridSize) / gridSize;

  let newFoodX, newFoodY;
  let isPositionValid;

  do {
    newFoodX = Math.floor(Math.random() * maxX) * gridSize;
    newFoodY = Math.floor(Math.random() * maxY) * gridSize;

    isPositionValid = !snake.some(
      (segment) =>
        Math.abs(segment.x - newFoodX) < gridSize &&
        Math.abs(segment.y - newFoodY) < gridSize
    );
  } while (!isPositionValid);

  foodX = newFoodX;
  foodY = newFoodY;
  food.style.left = `${foodX}px`;
  food.style.top = `${foodY}px`;
}

function startGame() {
  if (!gameLoop) {
    gameLoop = setInterval(move, speed);
  }
}
document.querySelector(".up").addEventListener(".click", () => {
  if (direction !== "down") nextDirection = "up";
  startGame();
});

document.querySelector(".down").addEventListener(".click", () => {
  if (direction !== "up") nextDirection = "down";
  startGame();
});

document.querySelector(".right").addEventListener(".click", () => {
  if (direction !== "left") nextDirection = "right";
  startGame();
});

document.querySelector(".left").addEventListener(".click", () => {
  if (direction !== "right") nextDirection = "left";
  startGame();
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") nextDirection = "up";
      startGame();
      break;
    case "ArrowDown":
      if (direction !== "up") nextDirection = "down";
      startGame();
      break;
    case "ArrowLeft":
      if (direction !== "right") nextDirection = "left";
      startGame();
      break;
    case "ArrowRight":
      if (direction !== "left") nextDirection = "right";
      startGame();
      break;
  }
});

function move() {
  direction = nextDirection;
  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y -= gridSize;
      break;
    case "down":
      head.y += gridSize;
      break;
    case "left":
      head.x -= gridSize;
      break;
    case "right":
      head.x += gridSize;
      break;
  }

  if (
    head.x < 0 ||
    head.x >= gameScreen.clientWidth ||
    head.y < 0 ||
    head.y >= gameScreen.clientHeight
  ) {
    endGame();
    return;
  }

  if (snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
    endGame();
    return;
  }

  snake.unshift(head);

  if (head.x === foodX && head.y === foodY) {
    score++;
    scoreDisplay.textContent = `Score : ${score}`;

    if (score % 5 === 0 && speed > 50) {
      speed -= 10;
      clearInterval(gameLoop);
      gameLoop = setInterval(move, speed);
    }

    placeFood();
  } else {
    snake.pop();
  }

  renderSnake();
}

function endGame() {
  clearInterval(gameLoop);
  alert(`The game is finish! Your Score: ${score}`);
  if (confirm("Do you want to play again?")) {
    resetGame();
  }
}

function resetGame() {
  snake = [{ x: startX, y: startY }];
  direction = "right";
  nextDirection = "right";
  score = 0;
  speed = 200;
  scoreDisplay.textContent = "Score : 0";
  placeFood();
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = null;
  renderSnake();
}

function renderSnake() {
  container.innerHTML = "";
  snake.forEach((seg, i) => {
    const segElement = document.createElement("div");
    segElement.className = "snake-segment";
    segElement.style.left = `${seg.x}px`;
    segElement.style.top = `${seg.y}px`;
    if (i === 0) segElement.style.backgroundColor = "darkgreen";
    container.appendChild(segElement);
  });
}
resetGame();

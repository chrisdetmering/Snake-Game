const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

let snakePositionX = 100;
let snakePositionY = 50;
let snakeSpeedX = 5;
let snakeSpeedY = 5;

let applePositionX = 180;
let applePositionY = 100;
let appleWidth = 2;
let appleHeight = 2;

let snake = {
  x: 100,
  y: 50,
  w: 7,
  h: 7
};

let apple = {
  x: 180,
  y: 100,
  w: 2,
  h: 2
};

let score = 0;

let direction;

function drawSnake() {
ctx.beginPath();
ctx.rect(snakePositionX,snakePositionY,7,7 );
ctx.fillStyle = "#90EE90"
ctx.fill();
ctx.closePath;
};

function drawApple() {
ctx.beginPath();
ctx.rect(applePositionX,applePositionY,2,2);
ctx.fillStyle = "#FF0000"
ctx.fill();
ctx.closePath;
};

function gameOver () {
  let gradient = ctx.createLinearGradient(0,0, canvas.width, 0);
  gradient.addColorStop("0","blue");
  ctx.rect(120, 75, 200, 100 )
  ctx.fillStyle = gradient;
  ctx.fillText("Game Over", 120, 75);
}

function moveSnake() {
  switch (direction) {
    case "right":
      snakePositionX += snakeSpeedX
      break;
    case "left":
      snakePositionX -= snakeSpeedX
      break;
    case "up":
      snakePositionY -= snakeSpeedY
      break;
    case "down":
      snakePositionY += snakeSpeedY
      break;
    default:
      break;
  }
}

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowDown":
        direction = "down"
        break;
      case "ArrowUp":
        direction = "up"
          break;
      case "ArrowRight":
        direction = "right"
          break;
      case "ArrowLeft":
        direction = "left"
          break;
      default:
        break;
    }
  })

window.onload = () => {
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple();
    drawSnake();
    moveSnake();
  if (snakePositionX + snakeSpeedX === canvas.width || snakePositionX + snakeSpeedX < 0) {
    gameOver();
    reset();
  }
  if (snakePositionY + snakeSpeedY === canvas.height || snakePositionY + snakeSpeedY < 0 ) {
    gameOver();
    reset();
  }
  }, 100);
  appleDetection();
};

function reset(){
  snakePositionX = canvas.width/2
  snakePositionY = canvas.height/2
};

function appleDetection (apple, snake) {
  if (snake.x < apple.x + apple.w &&
    snake.x + snake.w > apple.x &&
    snake.y < apple.y + apple.h &&
    snake.y + snake.h > apple.y) {
      console.log('collision!')
    }
  }

appleDetection();
// let snake = {
//   x: 100,
//   y: 50,
//   w: 7,
//   h: 7
// };

// let apple = {
//   x: 180,
//   y: 100,
//   w: 2,
//   h: 2
// };

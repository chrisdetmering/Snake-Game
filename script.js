const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const SNAKE_SPEED = 5;

let snake = {
	segment: [ { x: 100, y: 50 }, { x: 95, y: 50 } ],
	w: 7,
	h: 7
};

let apple = {
	x: 180,
	y: 100,
	w: 7,
	h: 7
};

let direction;

let score = 0;

function drawSnake() {
	snake.segment.forEach((snakePart) => {
		ctx.beginPath();
		ctx.rect(snakePart.x, snakePart.y, snake.w, snake.h);
		ctx.fillStyle = '#90EE90';
		ctx.fill();
		ctx.closePath;
	});
}

function drawApple() {
	ctx.beginPath();
	ctx.rect(apple.x, apple.y, apple.w, apple.w);
	ctx.fillStyle = '#FF0000';
	ctx.fill();
	ctx.closePath;
}

function drawScoreBoard() {
	ctx.font = '10px Arial';
	ctx.fillStyle = '#8B008B';
	ctx.fillText('Score:' + score, 8, 9);
}

function moveSnake() {
	if (direction) {
		for (let i = snake.segment.length - 1; i > 0; i--) {
			snake.segment[i].x = snake.segment[i - 1].x;
			snake.segment[i].y = snake.segment[i - 1].y;
		}
	}
	switch (direction) {
		case 'right':
			snake.segment[0].x += SNAKE_SPEED;
			break;
		case 'left':
			snake.segment[0].x -= SNAKE_SPEED;
			break;
		case 'up':
			snake.segment[0].y -= SNAKE_SPEED;
			break;
		case 'down':
			snake.segment[0].y += SNAKE_SPEED;
			break;
		default:
			break;
	}
}

window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowDown':
			direction = 'down';
			break;
		case 'ArrowUp':
			direction = 'up';
			break;
		case 'ArrowRight':
			direction = 'right';
			break;
		case 'ArrowLeft':
			direction = 'left';
			break;
		default:
			break;
	}
});

function reset() {
	clearInterval(interval);
	window.location.reload();
}

function appleDetection() {
	const snakeHeadX = snake.segment[0].x; 
	const snakeHeadY = snake.segment[0].y;
	const appleX = apple.x; 
	const appleY = apple.y; 



	if ((snakeHeadX === appleX) && (snakeHeadY === appleY)) {
		placeApple();
		let newTail = Object.assign({}, snake.segment.length + 1);
		snake.segment.push(newTail);
		score++;
	}
}

function placeApple() {
	apple.x = Math.floor(Math.random() * (canvas.width / SNAKE_SPEED)) * SNAKE_SPEED;
	apple.y = Math.floor(Math.random() * (canvas.height / SNAKE_SPEED)) * SNAKE_SPEED;
}

window.onload = () => {
	interval = setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawApple();
		drawSnake();
		drawScoreBoard();
		moveSnake();
		appleDetection();
		bodyCollision();
		wallCollision(); 

	}, 100);
};

function wallCollision() {
	
	if (snake.segment[0].x + SNAKE_SPEED > canvas.width || snake.segment[0].x + SNAKE_SPEED < 0) {
		alert('You ran into a wall!');
		reset();
	}
	if (snake.segment[0].y + SNAKE_SPEED > canvas.height || snake.segment[0].y + SNAKE_SPEED < 0) {
		alert('You ran into a wall!');
		reset();
	}
}


function bodyCollision() {
	for (let i = 1; i < snake.segment.length; i++) {
		if (snake.segment[0].x === snake.segment[i].x && snake.segment[0].y === snake.segment[i].y) {
			drawGameOver();
			alert('You ate yourself!');
			reset();
		}
	}
}


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const SNAKE_SPEED = 5;
let direction;
let score = 0;

const snake = {
	segment: [ { x: 100, y: 50 }, { x: 95, y: 50 } ],
	w: 5,
	h: 5
};

const apple = {
	x: 180,
	y: 50,
	w: 5,
	h: 5
};



//check
function drawSnake() {
	snake.segment.forEach((snakePart) => {
		ctx.beginPath();
		ctx.rect(snakePart.x, snakePart.y, snake.w, snake.h);
		ctx.fillStyle = '#90EE90';
		ctx.fill();
		ctx.closePath;
	});
}

//check
function drawApple() {
	ctx.beginPath();
	ctx.rect(apple.x, apple.y, apple.w, apple.w);
	ctx.fillStyle = '#FF0000';
	ctx.fill();
	ctx.closePath;
}

//check
function drawScoreBoard() {
	ctx.font = '10px Arial';
	ctx.fillStyle = '#8B008B';
	ctx.fillText('Score:' + score, 8, 9);
}


function moveSnake() {
	//great! So you don't have to make a copy! 
	if (direction) {
		for (let i = snake.segment.length - 1; i > 0; i--) {
			snake.segment[i].x = snake.segment[i - 1].x;
			snake.segment[i].y = snake.segment[i - 1].y;
		}
	}

//check
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

//check
window.addEventListener('keydown', (e) => {
	e.preventDefault();
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

//check
function reset() {
	clearInterval(interval);

	window.location.reload();
}


function appleDetection() {
	const snakeX = snake.segment[0].x; 
	const snakeY = snake.segment[0].y;
	const appleX = apple.x; 
	const appleY = apple.y; 

	if ((snakeX === appleX) && (snakeY === appleY)) {
		eatApple();
		let newTail = Object.assign({}, snake.segment.length + 1);
		snake.segment.push(newTail);
	}
}

//fix placing random apple based off of SNAKE_SPEED
function eatApple() {
	apple.x = Math.floor(Math.random() * (canvas.width / SNAKE_SPEED)) * SNAKE_SPEED;
	apple.y = Math.floor(Math.random() * (canvas.height / SNAKE_SPEED)) * SNAKE_SPEED;
	score++;
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



//abstracted this away to it's own function 
function wallCollision() { 
	if (snake.segment[0].x + SNAKE_SPEED > canvas.width || snake.segment[0].x + SNAKE_SPEED < 0) {
		alert('You ran into a wall!')
		reset();
	} 
	if (snake.segment[0].y + SNAKE_SPEED > canvas.height || snake.segment[0].y + SNAKE_SPEED < 0) {
		alert('You ran into a wall!')
		reset();
	}

}

function bodyCollision() {
	for (let i = 1; i < snake.segment.length; i++) {
		if (snake.segment[0].x === snake.segment[i].x && snake.segment[0].y === snake.segment[i].y) {
			alert('You ate yourself!');
			reset();
		}
	}
}


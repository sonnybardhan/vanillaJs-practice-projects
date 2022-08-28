const rulesBtn = document.querySelector('.rules-btn');
const rules = document.querySelector('.rules');
const closeBtn = document.querySelector('#close-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BLUE = '#0095dd';
let score = 0;
let gameOver = false;
let level = 1;

const BRICK_COLUMNS = 9;
const BRICK_ROWS = 1;

rulesBtn.addEventListener('click', () => {
  rules.classList.add('rules-show');
});

closeBtn.addEventListener('click', () => {
  rules.classList.remove('rules-show');
});

const brickData = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 45,
  visible: true,
};

let bricks = [];

for (let i = 0; i < BRICK_COLUMNS; i++) {
  bricks[i] = [];
  for (let j = 0; j < BRICK_ROWS; j++) {
    const x = i * (brickData.w + brickData.padding) + brickData.offsetX;
    const y = j * (brickData.h + brickData.padding) + brickData.offsetY;
    bricks[i][j] = { x, y, ...brickData };
  }
}

//draw bricks
function drawBricks() {
  bricks.forEach((col) => {
    col.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? BLUE : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

//create ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

//create paddle
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// draw score
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  // ctx.arc(position x, position y, radius, start, end);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  (ctx.fillStyle = BLUE), ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function movePaddle() {
  paddle.x += paddle.dx;

  //wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //collision detection
  //right and left walls
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  //top and bottom
  // if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
  //   ball.dy *= -1;
  // }

  if (ball.y - ball.size < 0) {
    // ball.speed *= -1;
    ball.dy *= -1;
  }

  if (ball.y + ball.size > canvas.height) {
    gameOver = true;
  }

  //collision with paddle
  if (
    ball.x + ball.size > paddle.x &&
    // ball.x - ball.size > paddle.x &&
    // ball.x + ball.size < paddle.x + paddle.w &&
    ball.x - ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy *= -1;
    // ball.dx *= -1;
  }

  //brick collision
  bricks.forEach((col) => {
    col.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x + ball.size > brick.x &&
          ball.x - ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y && //brick top
          ball.y - ball.size < brick.y + brick.h //brick bottom
        ) {
          brick.visible = false;
          ball.dy *= -1;
          // score += 1;
          increaseScore();

          if (score % 5 === 0) {
            ball.speed += 1;
            console.log(ball.speed);
          }
        }
      }
    });
  });
}

//increase score
function increaseScore() {
  score++;
  const totalBricks = BRICK_COLUMNS * BRICK_ROWS;
  if (score % totalBricks === 0) {
    resetGame();
  }
}

//make all bricks reappear
function showAllBricks() {
  bricks = [];
  for (let i = 0; i < BRICK_COLUMNS; i++) {
    bricks[i] = [];
    for (let j = 0; j < BRICK_ROWS; j++) {
      const x = i * (brickData.w + brickData.padding) + brickData.offsetX;
      const y = j * (brickData.h + brickData.padding) + brickData.offsetY;
      bricks[i][j] = { x, y, ...brickData };
    }
  }
}

function resetGame() {
  showAllBricks();
  score = 0;
  ball.x = (paddle.x + paddle.w) / 2;
  ball.y = paddle.y;
  // ball.x = canvas.width / 2;
  // ball.y = canvas.height / 2;
  ball.dy *= -1;
}

function keyUp(e) {
  const { key } = e;
  if (
    key === 'Right' ||
    key === 'ArrowRight' ||
    key === 'Left' ||
    key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

function keyDown(e) {
  const { key } = e;

  if (key === 'Right' || key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  }
  if (key === 'Left' || key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function draw() {
  //clear the canvas at the start of every rendering
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
  movePaddle();
  moveBall();
}

// draw();
function update() {
  if (gameOver) {
    resetGame();
    gameOver = false;
  }
  draw();
  requestAnimationFrame(update);
}
update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

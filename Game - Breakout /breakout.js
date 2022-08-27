const rulesBtn = document.querySelector('.rules-btn');
const rules = document.querySelector('.rules');
const closeBtn = document.querySelector('#close-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BLUE = '#0095dd';

rulesBtn.addEventListener('click', () => {
  rules.classList.add('rules-show');
});

closeBtn.addEventListener('click', () => {
  rules.classList.remove('rules-show');
});

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

drawBall();
drawPaddle();

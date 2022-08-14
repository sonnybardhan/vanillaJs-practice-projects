const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // ctx.fillStyle = 'white';
  // ctx.fillRect(10, 10, 500, 500);
});

console.log(ctx);
// ctx.fillStyle = 'white';
// ctx.fillRect(10, 10, 500, 500);

const mouse = {
  x: 0,
  y: 0,
};

canvas.addEventListener('click', function (e) {
  const { x, y } = e;
  mouse.x = x;
  mouse.y = y;
  // drawCircle();
});

function drawCircle() {
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
  ctx.fill();
}

// drawCircle(100, 100);

canvas.addEventListener('mousemove', function (e) {
  const { x, y } = e;
  mouse.x = x;
  mouse.y = y;
  // drawThinCircle();
  drawCircle();
});

function drawThinCircle(x, y) {
  ctx.fillStyle = 'lightblue';
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  // drawThinCircle();
  requestAnimationFrame(animate);
}
animate();

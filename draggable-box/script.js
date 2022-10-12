const box = document.querySelector('.box');

box.addEventListener('mousedown', handleMouseDown);
box.addEventListener('mouseup', handleMouseUp);
window.addEventListener('mousemove', handleMouseMove);

let offsetX;
let offsetY;
let move = false;

function handleMouseDown(e) {
  move = true;
  const { x, y } = e;
  const { left, top } = this.getBoundingClientRect();

  offsetX = x - left;
  offsetY = y - top;
}

function handleMouseMove(e) {
  const { x, y } = e;
  if (move) {
    box.style.left = x - offsetX + 'px';
    box.style.top = y - offsetY + 'px';
  }
}

function handleMouseUp(e) {
  move = false;
}

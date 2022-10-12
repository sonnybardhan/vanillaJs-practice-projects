const box = document.querySelector('.box');
const xHandle = document.querySelector('.x-handle');
const yHandle = document.querySelector('.y-handle');

xHandle.addEventListener('mousedown', handleMouseDown);
yHandle.addEventListener('mousedown', handleMouseDown);

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseup', handleMouseUp);

let resize = false;
let handle;
let startLeftBorder;
let startTopBorder;

function handleMouseDown(e) {
  const parentNode = this.parentNode;
  const { left, top, right, bottom } = parentNode.getBoundingClientRect();

  startLeftBorder = left;
  startTopBorder = top;

  handle = this;
  resize = true;
}

function handleMouseMove(e) {
  const { x, y } = e;

  if (resize) {
    if (handle === xHandle) {
      if (x <= startLeftBorder + 25) return;
      const newWidth = x - startLeftBorder + 'px';
      box.style.width = newWidth;
    } else {
      if (y <= startTopBorder + 25) return;
      const newHeight = y - startTopBorder + 'px';
      box.style.height = newHeight;
    }
  }
}

function handleMouseUp(e) {
  resize = false;
}

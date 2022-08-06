const body = document.querySelector('body');
const box = document.getElementById('box1');
const resizers = document.querySelectorAll('.resizer');
const dragHandle = document.querySelector('.draghandle');

dragHandle.setAttribute('draggable', true);

body.addEventListener('dragover', (e) => e.preventDefault());

resizers.forEach((resizer) => {
  resizer.addEventListener('mousedown', onMouseDownResizer);
});

const initialPosition = {
  x: 0,
  y: 0,
};

const dimensions = {
  h: 0,
  w: 0,
};

let axis;

function onMouseDownResizer(e) {
  if (e.target.classList.contains('x')) {
    axis = 'x';
  } else {
    axis = 'y';
  }

  dimensions.h = e.target.parentElement.offsetHeight;
  dimensions.w = e.target.parentElement.offsetWidth;

  initialPosition.x = e.clientX;
  initialPosition.y = e.clientY;

  body.addEventListener('mousemove', onMouseMove);
  body.addEventListener('mouseup', onMouseUp);
}

function onMouseUp(e) {
  body.removeEventListener('mousemove', onMouseMove);
  body.removeEventListener('mouseup', onMouseUp);
  axis = '';
}

function onMouseMove(e) {
  const dx = e.clientX - initialPosition.x;
  const dy = e.clientY - initialPosition.y;

  if (axis === 'x') {
    box.style.width = `${dimensions.w + dx}px`;
  } else {
    box.style.height = `${dimensions.h + dy}px`;
  }
}

//drag functions

const initialBoxPosition = {
  x: 0,
  y: 0,
};

const boxClick = {
  x: 0,
  y: 0,
};

dragHandle.addEventListener('dragstart', onDragStart);

dragHandle.addEventListener('dragend', onDragEnd);

function onDragStart(e) {
  const { x, y, top, left } = e.target.offsetParent.getBoundingClientRect();
  initialBoxPosition.x = x;
  initialBoxPosition.y = y;

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  boxClick.x = mouseX - left;
  boxClick.y = mouseY - top;
}

function onDragEnd(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  box.style.left = mouseX - boxClick.x + 'px';
  box.style.top = mouseY - boxClick.y + 'px';
}

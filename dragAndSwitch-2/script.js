const body = document.querySelector('body');
const box = document.getElementById('box1');
const resizers = document.querySelectorAll('.resizer');
const dragHandle = document.querySelector('.draghandle');

// dragHandle.addEventListener('mousedown', onDrag);

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
  removeListeners();
}

function removeListeners() {
  body.removeEventListener('mousemove', onMouseMove);
  body.removeEventListener('mouseup', onMouseUp);
  axis = '';
}

function onMouseMove(e) {
  let dx = e.clientX - initialPosition.x;
  let dy = e.clientY - initialPosition.y;

  let newWidth = dimensions.w + dx;
  let newHeight = dimensions.h + dy;

  if (newWidth < 150) {
    newWidth = 150;
  }

  if (newHeight < 100) {
    newHeight = 100;
  }

  if (axis === 'x') {
    box.style.width = `${newWidth}px`;
  } else {
    box.style.height = `${newHeight}px`;
  }
}

//drag functions

dragHandle.setAttribute('draggable', true);

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
  removeListeners();
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

  const maxX = window.innerWidth;
  const maxY = window.innerHeight;

  let newX;
  let newY;

  let boxLeft = mouseX - boxClick.x;
  let boxRight = mouseX + (box.getBoundingClientRect().width - boxClick.x);
  let boxTop = mouseY - boxClick.y;
  let boxBottom = mouseY + (box.getBoundingClientRect().height - boxClick.y);

  if (boxLeft < 0) {
    newX = 0;
  } else if (boxRight > maxX) {
    newX = maxX - box.getBoundingClientRect().width;
  } else {
    newX = mouseX - boxClick.x;
  }

  if (boxTop < 0) {
    newY = 0;
  } else if (boxBottom > maxY) {
    newY = maxY - box.getBoundingClientRect().height;
  } else {
    newY = mouseY - boxClick.y;
  }

  box.style.left = newX + 'px';
  box.style.top = newY + 'px';
}

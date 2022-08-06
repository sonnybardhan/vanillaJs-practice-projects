const body = document.querySelector('body');
const box = document.getElementById('box1');
const resizers = document.querySelectorAll('.resizer');
const dragHandle = document.querySelector('.draghandle');

body.addEventListener('dragover', (e) => e.preventDefault());

box.addEventListener('click', function (e) {
  if (e.target.className === 'draghandle') {
    this.classList.toggle('selected');
  }
});

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

function adjustSize(size, gap = 25) {
  size = Math.floor(size);
  const remainder = size % gap;
  size -= remainder;
  return size;
}

function onMouseUp(e) {
  removeBodyListeners();
}

function removeBodyListeners() {
  body.removeEventListener('mousemove', onMouseMove);
  body.removeEventListener('mouseup', onMouseUp);
  // axis = '';
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

  // const newWidthX = adjustSize(newWidth)
  // const newHeightY = adjustSize(newHeight);

  if (axis === 'x') {
    box.style.width = `${adjustSize(newWidth)}px`;
    // box.style.width = `${newWidth}px`;
    // console.log('adjusted: ', adjustSize(newWidth));
  } else {
    box.style.height = `${adjustSize(newHeight)}px`;
    // box.style.height = `${newHeight}px`;
    // console.log('actual: ', newHeight);
    // console.log('adjusted: ', adjustSize(newHeight));
  }
}

//drag functions
dragHandle.addEventListener('mousedown', onDragHandleMouseDown);

function onDragHandleMouseDown() {
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
  // console.log('added drag listeners');

  //drag helper functions

  function onDragStart(e) {
    removeBodyListeners();
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

    box.style.left = adjustSize(newX, 50) + 'px';
    box.style.top = adjustSize(newY, 50) + 'px';

    removeDragListeners();
  }

  function removeDragListeners() {
    dragHandle.removeEventListener('dragstart', onDragStart);
    dragHandle.removeEventListener('dragend', onDragEnd);
    // console.log('removed drag listeners');
  }
}

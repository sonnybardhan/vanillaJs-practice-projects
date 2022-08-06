const body = document.querySelector('body');
const box = document.getElementById('box1');
const resizers = document.querySelectorAll('.resizer');

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
  console.log('mouseup triggered');
  axis = '';
}

function onMouseMove(e) {
  const dx = e.clientX - initialPosition.x;
  const dy = e.clientY - initialPosition.y;

  console.log('axis: ', axis);

  if (axis === 'x') {
    box.style.width = `${dimensions.w + dx}px`;
  } else {
    box.style.height = `${dimensions.h + dy}px`;
  }

  // console.log('dx: ', dx, 'dy: ', dy);
}

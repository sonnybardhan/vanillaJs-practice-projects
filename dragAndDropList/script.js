const body = document.querySelector('body');
const container = document.querySelector('#container');
const items = document.querySelectorAll('.item');

items.forEach((item) => {
  item.addEventListener('mousedown', onMouseDown);
});

let dragItem;
let moving = false;
let placeholder;

const initialPosition = {
  x: 0,
  y: 0,
};

function onMouseDown(e) {
  dragItem = e.target;
  const { top, left } = e.target.getBoundingClientRect();
  initialPosition.x = left;
  initialPosition.y = top;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseUp(e) {
  moving = false;
  if (placeholder) {
    placeholder.remove();
    placeholder = null;
  }
  dragItem.style.removeProperty('top');
  dragItem.style.removeProperty('left');
  dragItem.style.removeProperty('position');
  dragItem = null;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
  dragItem.style.position = 'absolute';
  dragItem.style.left = e.clientX + 'px';
  dragItem.style.top = e.clientY + 'px';

  if (!moving) {
    moving = true;
    const nextElement = dragItem.nextElementSibling;
    const parent = dragItem.parentNode;
    placeholder = generatePlaceholder();
    parent.insertBefore(placeholder, nextElement);
  }
}

function generatePlaceholder() {
  const div = document.createElement('div');
  div.classList.add('placeholder');
  return div;
}

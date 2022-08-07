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

const boxClick = {
  x: 0,
  y: 0,
};

function onMouseDown(e) {
  dragItem = e.target;
  const { top, left } = e.target.getBoundingClientRect();

  boxClick.x = e.clientX - left;
  boxClick.y = e.clientY - top;

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
  dragItem.style.left = e.clientX - boxClick.x + 'px';
  dragItem.style.top = e.clientY - boxClick.y + 'px';

  if (!moving) {
    moving = true;
    const nextElement = dragItem.nextElementSibling;
    const parent = dragItem.parentNode;
    placeholder = generatePlaceholder();
    parent.insertBefore(placeholder, nextElement);

    const previousElement = dragItem.previousElementSibling;

    //check if moving up or down
  }
}

function generatePlaceholder() {
  const div = document.createElement('div');
  div.classList.add('placeholder');
  return div;
}

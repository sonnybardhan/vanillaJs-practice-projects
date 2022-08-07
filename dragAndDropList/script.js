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

  dragItemMarginBottom = window
    .getComputedStyle(dragItem)
    .marginBottom.slice(0, -2);

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

  const initialY = initialPosition.y + boxClick.y;
  const mouseY = e.clientY;

  const nextElement = dragItem.nextElementSibling;
  const previousElement = placeholder && placeholder.previousElementSibling;
  const parent = dragItem.parentNode;

  if (!moving) {
    moving = true;
    placeholder = generatePlaceholder();
    // parent.insertBefore(placeholder, nextElement);
    insertBefore(parent, placeholder, dragItem);
  }

  // console.log('previousElement: ', previousElement);

  if (previousElement && isAbove(dragItem, previousElement)) {
    console.log('swap with: ', previousElement);
  } else if (nextElement && isAbove(nextElement, dragItem)) {
    console.log('swap with: ', nextElement);
  }
}

function isAbove(blockA, blockB) {
  if (
    blockA.getBoundingClientRect().top +
      blockA.getBoundingClientRect().height / 2 <
    blockB.getBoundingClientRect().top +
      blockB.getBoundingClientRect().height / 2
  )
    return true;

  return false;
}

//helper functions

function insertBefore(parent, newNode, currentnode) {
  parent.insertBefore(newNode, currentnode);
}

function insertAfter(parent, newNode, currentnode) {
  parent.insertBefore(
    newNode,
    currentnode.nextElementSibling?.nextElementSibling
  );
}

function generatePlaceholder() {
  const div = document.createElement('div');
  div.classList.add('placeholder');
  div.style.marginBottom = dragItemMarginBottom + 'px';
  return div;
}

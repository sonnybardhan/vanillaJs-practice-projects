const body = document.querySelector('body');
const container = document.querySelector('#container');
const items = document.querySelectorAll('.item');

items.forEach((item) => {
  item.addEventListener('mousedown', onMouseDown);
});

let dragItem;
let dragItemMarginBottom;
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

  if (!moving) {
    moving = true;
    const nextElement = dragItem.nextElementSibling;
    const parent = dragItem.parentNode;
    placeholder = generatePlaceholder();
    parent.insertBefore(placeholder, nextElement);
  }

  const parent = dragItem.parentNode;
  const previousElement = dragItem.previousElementSibling;
  const previousElementBottom = previousElement?.getBoundingClientRect().bottom;
  const nextElement = placeholder.nextElementSibling;
  const nextElementTop = nextElement?.getBoundingClientRect().top;

  console.log('initialY: ', initialY);
  console.log('previousElement: ', previousElement);
  console.log('nextElement: ', nextElement);

  if (mouseY < initialY) {
    // console.log('going UP');
    const { top } = dragItem.getBoundingClientRect();
    if (
      top <
      previousElementBottom - previousElement.getBoundingClientRect().height / 3
    ) {
      parent.insertBefore(placeholder, placeholder);
      parent.insertBefore(previousElement, nextElement);
      //update initialPosition.Y
      // initialPosition.x = left;
      initialPosition.y = placeholder.getBoundingClientRect().top;
    }
  } else {
    // console.log('going DOWN');
    const { bottom } = dragItem.getBoundingClientRect();
    if (
      bottom >
      nextElementTop + nextElement.getBoundingClientRect().height / 3
    ) {
      parent.insertBefore(placeholder, nextElement?.nextElementSibling);
      parent.insertBefore(nextElement, nextElement);
      initialPosition.y = placeholder.getBoundingClientRect().top;

      // insertAfter(placeholder, placeholder);
    }
  }
}

// function insertAfter(newNode, existingNode) {
//   existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
// }

function generatePlaceholder() {
  const div = document.createElement('div');
  div.classList.add('placeholder');
  div.style.marginBottom = dragItemMarginBottom + 'px';
  return div;
}

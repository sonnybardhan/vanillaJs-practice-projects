const body = document.querySelector('body');
const container = document.querySelector('#container');
const items = document.querySelectorAll('.item');

items.forEach((item) => {
  item.addEventListener('mousedown', onMouseDown);
});

const throttledOnMouseMove = throttle(onMouseMove);

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

  // document.addEventListener('mousemove', throttledOnMouseMove);
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
  dragItem.style.width = '100%';

  dragItem = null;
  // document.removeEventListener('mousemove', throttledOnMouseMove);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
  if (!dragItem) return;
  dragItem.style.position = 'absolute';
  dragItem.style.left = e.clientX - boxClick.x + 'px';
  dragItem.style.top = e.clientY - boxClick.y + 'px';

  dragItem.style.width =
    window.getComputedStyle(container).width.slice(0, -2) + 'px';

  const parent = dragItem.parentNode;
  const nextElement = dragItem.nextElementSibling;
  const previousElement = placeholder && placeholder.previousElementSibling;

  if (!moving) {
    moving = true;
    placeholder = generatePlaceholder();
    parent.insertBefore(placeholder, dragItem);
  }

  if (previousElement && isAbove(dragItem, previousElement)) {
    swap(dragItem, previousElement);
    swap(previousElement, placeholder);
  } else if (nextElement && isAbove(nextElement, dragItem)) {
    swap(dragItem, nextElement);
    swap(nextElement, placeholder);
  }
}

function swap(nodeA, nodeB) {
  const parent = nodeA.parentNode;

  const nodaANext = nodeA.nextElementSibling;
  const nodeBNext = nodeB.nextElementSibling;

  //insert B in place of A
  parent.insertBefore(nodeB, nodaANext);

  //insert A in place of B
  parent.insertBefore(nodeA, nodeBNext);
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

function throttle(func, delay = 50) {
  let lastInvocation = 0;

  if (Date.now() - lastInvocation < delay) {
    return;
  }
  lastInvocation = Date.now();

  return function (...args) {
    setTimeout(() => {
      lastInvocation = Date.now();
      func(...args);
    }, delay);
  };
}

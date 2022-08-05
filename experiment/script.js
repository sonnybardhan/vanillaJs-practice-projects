const body = document.querySelector('body');
const box = document.querySelector('#box');
const outer = document.querySelector('#outer');

let dragItem;
const boxClick = {
  x: null,
  y: null,
};
//create drag and drop anywhere on the body
box.setAttribute('draggable', true);

box.addEventListener('dragstart', function (e) {
  dragItem = this;
  const { top, left } = e.target.getBoundingClientRect();
  boxClick.x = e.clientX - left;
  boxClick.y = e.clientY - top;
});

box.addEventListener('dragend', function (e) {
  let x = e.clientX;
  let y = e.clientY;

  const windowX = window.innerWidth;
  const windowY = window.innerHeight;

  const boxWidth = e.target.offsetWidth;
  const boxHeight = e.target.offsetHeight;
  let boxLeft = x - boxClick.x;
  let boxRight = x + (boxWidth - boxClick.x);

  let boxTop = y - boxClick.y;
  let boxBottom = y + (boxHeight - boxClick.y);

  if (boxLeft < 0) {
    boxLeft = 0;
  }

  if (boxRight > windowX) {
    boxLeft = windowX - boxWidth;
  }

  if (boxTop < 0) {
    boxTop = 0;
  }

  if (boxBottom > windowY) {
    boxTop = windowY - boxHeight;
  }

  dragItem.style.position = 'absolute';
  dragItem.style.left = boxLeft + 'px';
  dragItem.style.top = boxTop + 'px';
  dragItem = null;
});

outer.addEventListener('dragover', (e) => e.preventDefault());

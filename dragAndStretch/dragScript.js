const body = document.querySelector('body');
const box1 = document.querySelector('#box1');
let dragItem;
const boxClick = {
  x: null,
  y: null,
};

box1.setAttribute('draggable', true);
box1.addEventListener('mouseover', function () {
  this.style.cursor = 'grab';
});

box1.addEventListener('dragstart', function (e) {
  dragItem = this;
  const { top, left } = e.target.getBoundingClientRect();
  boxClick.x = e.clientX - left;
  boxClick.y = e.clientY - top;
});

box1.addEventListener('dragend', function (e) {
  const windowX = window.innerWidth;
  const windowY = window.innerHeight;

  let x = e.clientX;
  let y = e.clientY;

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

box1.addEventListener('click', function (e) {
  e.target.classList.toggle('add-border');
});

body.addEventListener('dragover', (e) => e.preventDefault());

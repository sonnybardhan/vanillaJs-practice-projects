const body = document.querySelector('body');
const box1 = document.querySelector('#box1');
const box2 = document.querySelector('#box2');

let stretchX = false;
let stretchY = false;

body.addEventListener('dragover', function (e) {
  e.preventDefault();
});

box2.addEventListener('mousedown', function (e) {
  const { right, bottom } = e.target.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  if (mouseX > right - 10) {
    stretchX = true;
  } else {
    stretchX = false;
  }

  if (mouseY > bottom - 10) {
    stretchY = true;
  } else {
    stretchY = false;
  }
});

box2.addEventListener('mousemove', function (e) {
  const { right, bottom } = e.target.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // this.classList.add('add-grab-cursor');

  if (mouseX > right - 15) {
    this.classList.add('add-right-border');
  } else {
    this.classList.remove('add-right-border');
  }

  if (mouseY > bottom - 15) {
    this.classList.add('add-bottom-border');
  } else {
    this.classList.remove('add-bottom-border');
  }

  if (mouseX > right - 15 && mouseY > bottom - 15) {
    this.classList.add('add-diagnal-cursor');
  } else {
    this.classList.remove('add-diagnal-cursor');
  }
});

box2.addEventListener('mouseleave', function (e) {
  this.classList.remove('add-right-border');
  this.classList.remove('add-bottom-border');
});

body.addEventListener('mousemove', function (e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const { left, right, top, bottom, width } = box2.getBoundingClientRect();

  if (stretchX) {
    box2.style.width = `${width - 10}px`;
    box2.style.width = `${mouseX - left}px`;
    box2.classList.add('add-right-border');
  }

  if (stretchY) {
    box2.style.height = `${mouseY - top}px`;
    box2.classList.add('add-bottom-border');
  }
});

body.addEventListener('mouseup', function (e) {
  // if (stretchX) {
  stretchX = false;
  stretchY = false;
  box2.classList.remove('add-right-border');
  box2.classList.remove('add-bottom-border');
  // }
});

// box2.setAttribute('draggable', true);

// box2.addEventListener('dragstart', function (e) {
//   const { left, right, top, bottom, width } = box2.getBoundingClientRect();
// });

// box2.addEventListener('dragend', function (e) {
//   const { left, right, top, bottom, width } = e.target.getBoundingClientRect();

//   console.log(e.target);

//   const mouseX = e.clientX;
//   const mouseY = e.clientY;

//   console.log(mouseX, mouseY);

//   e.target.style.left = mouseX;
//   e.target.style.top = mouseY;
// });

//====================//========================

let dragItem;
const boxClick = {
  x: null,
  y: null,
};

box2.setAttribute('draggable', true);
box2.addEventListener('mouseover', function () {
  this.style.cursor = 'grab';
});

box2.addEventListener('dragstart', function (e) {
  dragItem = this;
  const { top, left } = e.target.getBoundingClientRect();
  boxClick.x = e.clientX - left;
  boxClick.y = e.clientY - top;
});

box2.addEventListener('dragend', function (e) {
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

// body.addEventListener('dragover', (e) => e.preventDefault());

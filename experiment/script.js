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
  // console.log('drag started at: ', e.clientX, e.clientY);

  const { top, left } = e.target.getBoundingClientRect();

  boxClick.x = e.clientX - left;
  boxClick.y = e.clientY - top;

  console.log('boxClick: ', boxClick);
});

box.addEventListener('dragend', function (e) {
  console.log('x: ', e.clientX, 'y: ', e.clientY);
  let x = e.clientX;
  let y = e.clientY;

  const windowX = window.innerWidth;
  const windowY = window.innerHeight;

  console.log('window: ', windowX, windowY);

  const boxX = e.target.offsetWidth;
  const boxY = e.target.offsetHeight;

  const totalX = x + boxX;
  const totalY = y + boxY;

  if (totalX > windowX) {
    return console.log('X: out of bounds!');
  }

  if (totalX < 0) {
    return console.log('X: out of bounds!');
  }

  if (totalY > windowY) {
    return console.log('Y: out of bounds!');
  }

  if (totalY < 0) {
    return console.log('Y: out of bounds!');
  }

  dragItem.style.position = 'absolute';
  dragItem.style.left = e.clientX + 'px';
  dragItem.style.top = e.clientY + 'px';
  dragItem = null;
});

outer.addEventListener('dragover', (e) => e.preventDefault());

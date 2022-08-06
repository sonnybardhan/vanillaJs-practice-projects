const body = document.querySelector('body');
const container = document.querySelector('#container');
const items = document.querySelectorAll('.item');

const initialPosition = {
  x: 0,
  y: 0,
};

container.addEventListener('dragover', (e) => {
  e.preventDefault();
});

container.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
});

items.forEach((item) => {
  item.setAttribute('draggable', true);
  item.addEventListener('dragstart', onDragStart);
  item.addEventListener('dragend', onDragEnd);
});

function onDragStart(e) {}

function onDragEnd(e) {}

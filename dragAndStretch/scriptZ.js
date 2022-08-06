const box = document.querySelector('#box2');
const body = document.querySelector('body');

body.addEventListener('dragover', function (e) {
  e.preventDefault();
});

box.setAttribute('draggable', true);

box.addEventListener('dragstart', function (e) {});

box.addEventListener('dragend', function (e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const { x, y, top, bottom, width, left, right } =
    e.target.getBoundingClientRect();

  e.target.style.left = mouseX + 'px';
  // console.log(e.target.getBoundingClientRect());
});

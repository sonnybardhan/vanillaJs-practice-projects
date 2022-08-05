const body = document.querySelector('body');
const box2 = document.querySelector('#box2');

let stretch = false;

box2.addEventListener('mousedown', function (e) {
  const { top, left, right, bottom } = e.target.getBoundingClientRect();
  const mouseX = e.clientX;
  // const mouseY = e.clientY;

  if (mouseX > right - 10) {
    stretch = true;
  } else {
    stretch = false;
  }
});

box2.addEventListener('mousemove', function (e) {
  const { right } = e.target.getBoundingClientRect();
  const mouseX = e.clientX;

  if (mouseX > right - 10) {
    this.classList.add('add-right-border');
  } else {
    this.classList.remove('add-right-border');
  }
});

box2.addEventListener('mouseleave', function (e) {
  this.classList.remove('add-right-border');
});

body.addEventListener('mousemove', function (e) {
  const mouseX = e.clientX;

  // const { x, y, left, right, top, bottom, width } =
  const { left } = box2.getBoundingClientRect();

  if (stretch) {
    box2.style.width = `${mouseX - left}px`;
    box2.classList.add('add-right-border');
  }
});

body.addEventListener('mouseup', function (e) {
  if (stretch) {
    stretch = false;
    // this.classList.add('add-right-border');
    box2.classList.remove('add-right-border');
  }
});

const body = document.querySelector('body');
const box2 = document.querySelector('#box2');
let clickedDown = false;

const box2Dimensions = {
  x: null,
  y: null,
  width: null,
  height: null,
};

box2.addEventListener('mousedown', function (e) {
  const { top, left, right, bottom } = e.target.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const borderWidth = 10;

  if (mouseX > right - borderWidth) {
    clickedDown = true;
  }

  // const newX = mouseX - left;

  // if (left + newX > left + 25) {
  //   console.log('entering');
  //   e.target.style.width = newX + 'px';
  // }
});

box2.addEventListener('mouseleave', function (e) {
  clickedDown = false;
});

box2.addEventListener('mousemove', function (e) {
  const { top, left, right, bottom } = e.target.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const borderWidth = 10;

  // if (mouseX > right - borderWidth) {
  //   this.classList.add('add-right-border');
  // } else {
  //   this.classList.remove('add-right-border');
  // }

  if (mouseX > right - borderWidth && clickedDown) {
    if (mouseX > left + 50) {
      this.style.width = mouseX + 'px';
    }
  }

  // if (mouseX > right - borderWidth || mouseX < left + borderWidth) {
  //   e.target.style.cursor = 'col-resize';
  // } else if (mouseY < top + borderWidth || mouseY > bottom - borderWidth) {
  //   e.target.style.cursor = 'row-resize';
  // } else {
  //   e.target.style.cursor = '';
  // }
});

box2.addEventListener('mouseup', function (e) {
  const { top, left, right, bottom } = e.target.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  clickedDown = false;
  // const newX = mouseX - left;

  // if (left + newX > left + 25) {
  //   console.log('entering');
  //   e.target.style.width = newX + 'px';
  // }
});

body.addEventListener('mousemove', function (e) {
  console.log('moving');
});

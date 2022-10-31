const leftDiv = document.querySelector('.left');
const rightDiv = document.querySelector('.right');
const rightContainer = document.querySelector('.right-inner-container');
const rightTopDiv = document.querySelector('.right-top');
const rightBottomDiv = document.querySelector('.right-bottom');

leftDiv.addEventListener('mouseover', handleMouseOver);
rightDiv.addEventListener('mouseover', handleMouseOver);
rightContainer.addEventListener('mouseover', handleMouseOver);

leftDiv.addEventListener('mousedown', handleMouseDown);
rightDiv.addEventListener('mousedown', handleMouseDown);

leftDiv.addEventListener('mouseup', handleMouseUp);
rightDiv.addEventListener('mouseup', handleMouseUp);

document.documentElement.addEventListener('mousemove', handleMouseMove);

let mouseDown = false;
let borderXDrag = false;
let borderYDrag = false;
let startX;
let startY;

let leftBorder = leftDiv.getBoundingClientRect().left;
let rightBorder = rightDiv.getBoundingClientRect().right;
let topBorder = leftDiv.getBoundingClientRect().top;
let bottomBorder = leftDiv.getBoundingClientRect().bottom;

window.addEventListener('resize', () => {
  leftBorder = leftDiv.getBoundingClientRect().left;
  rightBorder = rightDiv.getBoundingClientRect().right;
  topBorder = leftDiv.getBoundingClientRect().top;
  bottomBorder = leftDiv.getBoundingClientRect().bottom;
});

function handleMouseOver(e) {
  if (e.target === rightDiv || e.target === leftDiv) {
    this.classList.add('hover-x');
  } else if (e.target !== rightDiv && e.target !== leftDiv) {
    this.classList.remove('hover-x');
  }

  if (e.target === rightContainer) {
    this.classList.add('hover-y');
  } else if (e.target !== rightDiv) {
    this.classList.remove('hover-y');
  }
}

function handleMouseDown(e) {
  if (e.target === leftDiv || e.target === rightDiv) {
    borderXDrag = true;
    startX = e.x;
  } else if (e.target !== leftDiv && e.target !== rightDiv) {
    borderXDrag = false;
  }

  if (e.target === rightContainer) {
    borderYDrag = true;
    startY = e.y;
  } else if (e.target !== rightContainer) {
    borderYDrag = false;
  }
}

function handleMouseMove(e) {
  if (borderXDrag) {
    let endX = e.x;

    const newLeftWidth = endX - leftBorder + 'px';
    const newRightWidth = rightBorder - endX + 'px';

    leftDiv.style.width = newLeftWidth;
    rightDiv.style.width = newRightWidth;
  } else if (borderYDrag) {
    let endY = e.y;
    if (endY < topBorder || endY > bottomBorder) return;

    // console.log(endY);
    // const newTopHeight = topBorder + endY + 'px';
    const h = endY - topBorder;
    // console.log('h: ', h);
    console.log('topBorder: ', topBorder);
    console.log('endY: ', endY);

    const newTopHeight = endY + 'px';

    const newBottomHeight = bottomBorder - endY + 'px';

    rightTopDiv.style.height = newTopHeight;
    rightBottomDiv.style.height = newBottomHeight;

    rightTopDiv.style.marginBottom = '3px';
    rightBottomDiv.style.marginTop = '3px';
  }
}

function handleMouseUp() {
  borderXDrag = false;
  borderYDrag = false;
}

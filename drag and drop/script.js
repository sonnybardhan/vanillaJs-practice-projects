const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const dropbox = document.querySelector('#dropbox');

let dragItem;

btn1.setAttribute('draggable', 'true');
btn2.setAttribute('draggable', 'true');
btn3.setAttribute('draggable', 'true');

btn1.addEventListener('dragstart', function (event) {
  dragItem = this;
});

btn2.addEventListener('dragstart', function (event) {
  dragItem = this;
});
btn3.addEventListener('dragstart', function (event) {
  dragItem = this;
});

dropbox.addEventListener('drop', function (e) {
  if (e.target !== this) {
    // console.log(e.target.nextSibling);
    // console.log(e.target.nextSibling);
    console.log('should be inserted before', e.target);
    this.insertBefore(dragItem, e.target);
  } else {
    console.log('dropped!');
    this.append(dragItem);
  }
  dragItem = null;
});

dropbox.addEventListener('dragover', (e) => {
  e.preventDefault();
});

// dropbox.addEventListener('mouseenter', function (e) {
//   [...this.children].forEach((child) => {
//     if (child) {
//       console.log(child, child.getBoundingClientRect());
//     } else {
//     }
//   });
// });

// dropbox.addEventListener('mouseover', function (e) {
//   if (e.target !== this) {
//     // console.log(e.target.textContent);
//     console.log(e.target.nextSibling);
//     // console.log();
//     // console.log(e.target.getBoundingClientRect());
//     console.log('hovered on a child');
//   }
// });

// dropbox.getBoundingClientRect

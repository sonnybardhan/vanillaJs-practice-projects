const dragItems = document.querySelectorAll('.drag-item');

dragItems.forEach((item, idx) => {
  item.setAttribute('data-index', idx);
  item.addEventListener('drag', handleDrag);
  item.addEventListener('drop', handleDrop);
  item.addEventListener('dragenter', handleDragEnter);
  item.addEventListener('dragleave', handleDragLeave);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('dragend', handleDragEnd);
});

let activeDragItem;

function handleDrag(e) {
  activeDragItem = e.target;
  e.target.classList.add('drag');
}

function handleDrop(e) {
  e.target.classList.remove('drag-enter');
  if (e.target.id !== activeDragItem.id) {
    swap(activeDragItem, e.target);
  }
}

function handleDragEnter(e) {
  if (e.target.id !== activeDragItem.id) {
    e.target.classList.add('drag-enter');
  }
}

function handleDragLeave(e) {
  if (e.target.id !== activeDragItem.id) {
    e.target.classList.remove('drag-enter');
  }
}

function handleDragEnd(e) {
  e.target.classList.remove('drag');
}

function handleDragOver(e) {
  e.preventDefault();
}

// function swap(targetA, targetB) {
//   const parent = targetA.parentNode;

//   const elementAfterA = targetA.nextElementSibling;
//   const elementAfterB = targetB.nextElementSibling;

//   parent.insertBefore(targetB, elementAfterA);
//   parent.insertBefore(targetA, elementAfterB);
// }

function swap(elementA, elementB) {
  const parent = elementA.parentElement;

  const elAfterA = elementA.nextElementSibling;
  const elAfterB = elementB.nextElementSibling;

  parent.insertBefore(elementA, elAfterB);
  parent.insertBefore(elementB, elAfterA);
}

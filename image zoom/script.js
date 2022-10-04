const image = document.getElementById('image');
const range = document.getElementById('range');
const initialWidth = image.clientWidth;

range.addEventListener('input', function (e) {
  const val = e.target.value - 50;
  // const scaleBy = (val / 50).toFixed(2);
  const scaleBy = val / 50;
  let newWidth = initialWidth + initialWidth * scaleBy;
  if (newWidth < 100) {
    newWidth = 100;
  }

  image.style.width = newWidth + 'px';
});

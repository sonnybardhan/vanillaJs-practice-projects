Array.prototype.myFilter = function (cb) {
  const temp = [];
  this.forEach((element, idx) => {
    if (cb(element, idx, this)) {
      temp.push(element);
    }
  });
  return temp;
};

const arr = [1, 2, 3, 4];

const results = arr.myFilter((el, idx) => el % 2 === 0);

console.log(results);

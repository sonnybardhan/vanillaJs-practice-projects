Array.prototype.myReduce = function (cb, init_val) {
  let output = init_val == null ? this[0] : init_val;

  this.forEach((el, idx) => {
    output = cb(output, el, idx, this);
  });

  return output;
};

const arr = [1, 2, 3, 4];

const result = arr.myReduce((acc, curr) => acc * curr);

console.log(result);

Array.prototype.myMap = function (callback) {
  const arr = [];

  for (let i = 0; i < this.length; i++) {
    arr.push(callback(this[i], i, this));
  }
  return arr;
};

Array.prototype.myFilter = function (callback) {
  const arr = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === true) {
      arr.push(this[i]);
    }
  }
  return arr;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let result = initialValue;

  for (let i = 0; i < this.length; i++) {
    if (i === 0 && initialValue === undefined) {
      result = this[i];
    } else {
      result = callback(result, this[i], i, this);
    }
  }
  return result;
};

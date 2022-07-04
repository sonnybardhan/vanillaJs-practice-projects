module.exports = {
  forEach(arr, fn) {
    // for (let i = 0; i < arr.length; i++) {
    //   fn(arr[i], i);
    // }
    for (let idx in arr) {
      fn(arr[idx], idx);
    }
  },
  map(arr, fn) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i));
    }
    return result;
  },
};

// Array.prototype.myFilter = function (cb) {
//   const temp = [];
//   this.forEach((element, idx) => {
//     if (cb(element, idx, this)) {
//       temp.push(element);
//     }
//   });
//   return temp;
// };

Array.prototype.myFilter = function (fn) {
  if (!Array.isArray(this)) return;

  let result = [];
  // for (let i = 0; i < this.length; i++) {
  //   if (fn(this[i], i, this)) {
  //     result.push(this[i]);
  //   }
  // }

  this.forEach((item, idx) => {
    if (fn(item, idx, this)) {
      result.push(item);
    }
  });

  return result;
};

const arr = [1, 2, 3, 4];

const results = arr.myFilter((el, idx) => el % 2 === 0);

console.log(results);

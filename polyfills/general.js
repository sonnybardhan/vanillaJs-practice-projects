// //infinite currying

// function add(outerArg) {
//   return function (innerArg) {
//     if (!innerArg) {
//       return outerArg;
//     }
//     return add(outerArg + innerArg);
//   };
// }

// console.log(add(5)(6)(7)());

const calc = {
  total: 0,
  add(num) {
    this.total += num;
    return this;
  },
  mul(num) {
    this.total *= num;
    return this;
  },
  subtract(num) {
    this.total -= num;
    return this;
  },
};

const result = calc.add(10).mul(5).subtract(10).add(10);
console.log(result.total);

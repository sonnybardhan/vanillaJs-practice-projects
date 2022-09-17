// function makeUser() {
//   return {
//     name: 'john',
//     ref() {
//       return this;
//     },
//   };
// }
// const user = makeUser();

// console.log(user.ref().name);
// let user = {
//   name: 'sonny',
//   age: 24,
//   address: {
//     street: 'x',
//     details: {
//       inner: () => {
//         console.log('level 2', this);
//       },
//     },
//   },
//   getDetails() {
//     const inner = () => {
//       console.log('inner this: ', this);
//       const inner2 = () => {
//         console.log('inner2 this: ', this);
//         //the reference for 'this' comes from the 'this' total from it's parent function
//       };
//       inner2();
//     };
//     inner();
//   },
//   somefunc: () => {
//     console.log(this);
//   },
// };

// user.somefunc();

// console.log(user.ref);
//arrow functions reference for 'this' comes from the 'this' total from it's parent function

// const user = {
//   name: 'sonny',
//   logMessage() {
//     console.log(this.name);
//   },
// };

// setTimeout(() => user.logMessage(), 500);
// // const func = user.logMessage;
// // console.log(func());

// const calculator = {
//   // total1: undefined,
//   // total2: undefined,
//   read(total1, total2) {
//     this.total1 = total1;
//     this.total2 = total2;
//   },
//   sum() {
//     console.log(this.total1 + this.total2);
//   },
//   mul() {
//     console.log(this.total1 * this.total2);
//   },
// };

// calculator.read(1, 2);
// calculator.mul();
// calculator.sum();

// var length = 4;
// function callback() {
//   console.log(this.length);
// }

// const object = {
//   length: 5,
//   method(fn) {
//     fn();
//   },
// };

// callback();

// class Calc {
// constructor() {
//   let total = 0;
// }
const calc = {
  total: 0,

  add(num) {
    if (this.total != null) {
      this.total += num;
    } else {
      this.total = num;
    }
    return this;
  },
  multiply(num) {
    if (this.total != null) {
      this.total *= num;
    } else {
      this.total = num;
    }
    return this;
  },
  divide(num) {
    if (this.total != null) {
      this.total /= num;
    } else {
      this.total = num;
    }
    return this;
  },
  subtract(num) {
    if (this.total != null) {
      this.total -= num;
    } else {
      this.total = num;
    }
    return this;
  },
  get displayTotal() {
    return this.total;
  },
};

// const myCalc = new Calc();
const result = calc.add(10).multiply(5).subtract(5).add(10);
// console.log(result.displayTotal);
console.log(result.total);
// console.log(myCalc.add(10).multiply(5));

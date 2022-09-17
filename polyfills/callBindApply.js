class MyCall {
  constructor(thisObj, ...args) {
    this.thisObj = thisObj;
    this.arguments = [...args];
  }
}

const obj1 = { name: 'sonny' };

const obj2 = {
  printCar() {
    console.log(this.brand);
  },
  print() {
    console.log(this.name);
  },
  printAge(age) {
    console.log('age: ', age);
  },
  printNum(num) {
    console.log(num);
  },
  printArray(arr) {
    // console.log();
    console.log(Array.isArray(arr));
    arr.forEach((item) => console.log(item));
  },
};

// obj2.print.call(obj1);
// obj2.print.myCall(obj1);

Function.prototype.myCall = function (newThis = {}, ...args) {
  console.log(typeof this);
  if (typeof this !== 'function') {
    // throw new Error('this needs to be a function');
    return console.log('error!');
  }
  const method = Symbol('method');
  console.log('myCall ran ... ');
  newThis[method] = this;
  newThis[method](...args);
};
// Function.prototype.myCall = function (newThis = {}, ...args) {
//   const method = Symbol('method');
//   console.log('myCall ran ... ');
//   newThis[method] = this;
//   newThis[method](...args);
// };

// obj2.print.myCall(obj1);
// obj2.printArray.apply(obj2, [1, 2, 3]);
// obj2.printArray.myApply(obj2, [1, 2, 3]);
const x = [1];

// obj2.printAge.call(obj1, 34, 99);
// obj2.x.myCall(obj1, 34, 99);
// obj2.printAge.myCall(obj1, 34, 99);

// const test = new MyCall(obj, 1, 2, 3);

//call takes in a 'this' context followed by optional arguments,
//and immediately invokes the method with those arguments on the new 'this' context

// p1.getAge.call(p2);
// p1.getAgeArrow.call(p2);

const car = {
  brand: 'ferrari',
};

function purchase(price, tax) {
  console.log(
    `the bloody ${this.brand} cost me ${price} donkeys and ${tax} cows in tax`
  );
}

// purchase.call(car, 23, 5);
// purchase.myCall(car, 23, 5);

const nums = [5, 6, 3, 4, 8, 9, 1];
// console.log(Math.max.apply(null, nums));

Function.prototype.myApply = function (newThis = {}, args = []) {
  if (!Array.isArray(args)) {
    throw new Error('Args need to be an array');
  }
  const method = Symbol('method');
  newThis[method] = this;
  newThis[method](...args);
};

Function.prototype.myBind = function (newThis = {}, ...args) {
  const method = Symbol('method');
  newThis[method] = this;

  return function (...rest) {
    newThis[method](...args, ...rest);
  };
};

// console.log(Math.max.myApply(null, nums));

// const y = obj2.printCar.myBind(car);
const y = purchase.myBind(car, 10);

console.log(y(20));

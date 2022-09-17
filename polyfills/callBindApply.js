class MyCall {
  constructor(thisObj, ...args) {
    this.thisObj = thisObj;
    this.arguments = [...args];
  }
}

const obj1 = { name: 'sonny' };

const obj2 = {
  print() {
    console.log(this.name);
  },
  printAge(age) {
    console.log('age: ', age);
  },
};

// obj2.print.call(obj1);
// obj2.print.myCall(obj1);

Function.prototype.myCall = function (newThis, ...args) {
  // const replica = { ...newThis, method: this };
  const replica = Object.assign(newThis, { method: this });

  if (!args.length) {
    replica.method();
  } else {
    args.forEach((item) => replica.method(item));
  }
};

obj2.print.myCall(obj1);
obj2.printAge.myCall(obj1, 34, 99);

// const test = new MyCall(obj, 1, 2, 3);

//call takes in a 'this' context followed by optional arguments,
//and immediately invokes the method with those arguments on the new 'this' context

// p1.getAge.call(p2);
// p1.getAgeArrow.call(p2);

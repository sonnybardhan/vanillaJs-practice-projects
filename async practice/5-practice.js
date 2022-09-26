console.log('start');

function somefunc(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, 1000);
  });
}

function func2(msg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`func2: ${msg}`);
    }, 1000);
  });
}

function func3(msg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`func3: ${msg}`);
    }, 1000);
  });
}

// function func3(msg, cb) {
//   setTimeout(() => {
//     cb('func3');
//   }, 1000);
// }

somefunc('hello')
  // .then(console.log)
  .then((res) => {
    console.log(res);
    return func2('testing');
  })
  .then((res) => {
    console.log(res);
    return func3('testing again');
  })
  .then((res) => {
    console.log(res);
  });

// console.log('stop');

// const p = new Promise((resolve, reject) => {
//   const result = Math.random();

//   if (result > 0.5) {
//     resolve(true);
//   } else {
//     reject(false);
//   }
//   return;
// });

// p.then(console.log).catch(console.log);

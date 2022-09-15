const promiseDivide = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      return reject(`You cannot divide by 0!`);
    }
    return resolve(a / b);
  });
};

promiseDivide(10, 0)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

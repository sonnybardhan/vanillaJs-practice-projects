const race = async (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((prom) => prom.then(resolve, reject));
  });
};

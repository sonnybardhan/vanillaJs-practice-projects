function promiseAll(promises) {
  return new Promise((resolve, rej) => {
		if(!promises.length) resolve([]);

    const results = [];
    let count = 0;

    promises.forEach((promise) => {
      try {
        Promise
					.resolve((promise, idx))
					.then((res) => {
						results[idx] = res;
						count++;
						if (count === promises.length) {
							resolve(results);
						}
					});
      } catch (err) {
					rej(err);
      }
    });
  });
}


async function myPromiseAll(promises){
	return new Promise((resolve, reject) => {
		if(!promises.length) resolve([]);

		const results = [];

		let count = 0;
		for(let i = 0; i<promises.length; i++){
			try{
				const result = await Promise.resolve(promises[i]);
				results[i] = result;
				count++;
				if(count === promises.length){
					resolve(results);
				}
			} catch(err){
				reject(err);
			}
		}
	});
}
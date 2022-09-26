// 1. guess the output
// console.log('start');
// const promise1 = new Promise((res, rej) => {
//   console.log(1);
//   res(2);
// });

// promise1.then((res) => {
//   console.log(res);
// });

// console.log('end');

/**
 
1. guess

start
1
end
2

[CORRECT]
 */

// // 2. guess the output
// console.log('start');

// const promise1 = new Promise((res, rej) => {
//   console.log(1);
//   res(2);
//   console.log(3);
// });

// promise1.then((res) => {
//   console.log(res);
// });

// console.log('end');

// /*
// 2. guess

// start
// 1
// 3
// end
// 2
// [CORRECT]
//  */

// 3. guess the output
// console.log('start');

// const promise1 = new Promise((res, rej) => {
//   console.log(1);
//   console.log(3);
// });

// promise1.then((res) => {
//   console.log('res: ', res);
// });

// console.log('end');

/*
3. guess

start
1
3
end
[CORRECT]

.then() blocks are skipped when nothing is passed in them
 */

// 4. guess the output

// console.log('start');

// const fn = () =>
//   new Promise((res, rej) => {
//     console.log(1);
//     res('success');
//   });
// console.log('middle');

// fn().then((res) => {
//   console.log(res);
// });

// console.log('end');

/*
4. guess

start
middle
1
end
success
[CORRECT]
 */

//5. guess the output

// function job() {
//   return new Promise(function (res, rej) {
//     rej();
//   });
// }

// let p = job();

// p.then(function () {
//   console.log('success 1');
// })
//   .then(function () {
//     console.log('success 2');
//   })
//   .then(function () {
//     console.log('success 3');
//   })
//   .catch(function () {
//     console.log('error 1');
//   })
//   .then(function () {
//     console.log('success 4');
//   });

/*
5. guess

error 1
[WRONG]

Answer: 
error 1
success 4  
 */

// // 6. guess

// function job(state) {
//   return new Promise((res, rej) => {
//     if (state) {
//       res('success');
//     } else {
//       rej('error');
//     }
//   });
// }

// let promise = job(true);

// promise
//   .then(function (data) {
//     console.log(data);
//     return job(false);
//   })
//   .catch(function (err) {
//     console.log(err);
//     return 'error caught';
//   })
//   .then(function (data) {
//     console.log(data);
//     return job(true);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// /**

// 	success
// 	error
// 	error caught
// [CORRECT]
// 	 */

// 7. guess

// function job(state) {
//   return new Promise((res, rej) => {
//     if (state) {
//       res('success');
//     } else {
//       rej('error');
//     }
//   });
// }

// let promise = job(true);

// promise
//   .then(function (data) {
//     console.log(data); //success
//     return job(true);
//   })
//   .then(function (data) {
//     if (data !== 'victory') {
//       throw 'Defeat';
//     }
//     return job(true);
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err); //defeat
//     return job(false);
//   })
//   .then(function (data) {
//     console.log(data);
//     return job(true);
//   })
//   .catch(function (err) {
//     console.log(err); //'error'
//     return 'error caught';
//   })
//   .then(function (data) {
//     console.log(data); //error caught
//     return new Error('test');
//   })
//   .then(function (data) {
//     console.log('success', data.message); //success: test [this happens]
//   })
//   .catch(function (data) {
//     console.log('catch error: ', data.message); //error: test [wrong]
//   });

/**
	 
	success [198]
	defeat [211]
	error [219]
	error caught[223]
	error: test [230] ... [X] ... then 'returns' does not 'throw', so it lands in a then block

	[This happens]
	success: test [this happens]

**/

// const firstPromise = new Promise((res, rej) => {
//   res('first');
// });

// const secondPromise = new Promise((res, rej) => {
//   res(firstPromise);
// });

// secondPromise.then((res) => {
//   console.log(res);
// });

// function loadJSON(url) {
//   return fetch(url).then((res) => {
//     if (res.status === 200) {
//       return res.json();
//     } else {
//       throw new Error(res.status);
//     }
//   });
// }

// const loadJSON = async (url) => {
//   try {
//     const res = await fetch(url);
//     return res.json();
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// loadJSON('https://google.com').catch((err) => console.log(err));

// function promiseRecurse(array, results=[]){
// 	if(!array.length) return results;

// 	return Promise.resolve(array[0])
// 		.then(res => {
// 			results.push(res)
// 			return promiseRecurse(array.slice(1), results);
// 		})
// }
async function promiseRecurse(array, results = []) {
  if (!array.length) return results;

  const res = await array[0];
  results.push(res);

  return promiseRecurse(array.slice(1), results);
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

console.log(promiseRecurse([p1, p2, p3]));

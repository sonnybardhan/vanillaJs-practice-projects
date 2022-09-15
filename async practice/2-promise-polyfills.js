/*
Promise polyfill implementation

 - MyPromise takes in an executor function 
 - executor function accepts resolve and reject callback functions
	- resolve takes in a value and is called on success
	- reject takes in the error value and is called on an error
	- then is called post resolution
		- then takes in a callback and returns a promise
	- catch
		- takes in a callback and returns a promise


*/
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; //pending/fulfilled/rejected
    this.value;
    this.onResolve;
    this.onReject;

    executor(this.resolve, this.reject);
  }

  // executor(resolve, reject) {}

  resolve(value) {
    this.onResolve(value);
  }

  reject() {
    this.onReject(value);
  }

  then(cb) {
    this.onResolve = cb;
    return this;
  }

  catch(cb) {
    this.onReject = cb;
    return this;
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('successful!');
  }, 1000);
});

myPromise.then((res) => console.log(res)).catch((err) => console.log(err));

// class EventTarget {
//   constructor() {}

//   addEventListener(name, callback) {
//     try {
//       if (!this[name]) {
//         this[name] = callback;
//       }
//       throw 'event listener does not exist!';
//     } catch (err) {
//       // console.error(err.message);
//       console.log(err);
//     }
//   }
//   removeEventListener(name, callback) {
//     try {
//       delete this[name];
//       callback();
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   dispatchEvent(name) {
//     this[name]();
//   }
// }

class EventTarget {
  constructor() {
    this.listeners = {};
  }

  addEventListener(name, callback) {
    if (!this.listeners.hasOwnProperty(name)) {
      this.listeners[name] = new Set([callback]);
    } else {
      this.listeners[name].add(callback);
    }
  }

  removeEventListener(name, callback) {
    this.listeners[name]?.delete(callback);
  }

  dispatchEvent(name) {
    this.listeners[name]?.forEach((callback) => {
      callback();
    });
  }
}

const e = new EventTarget();

function hello() {
  console.log('hello');
}

function bye() {
  console.log('bye');
}

e.addEventListener('clic', hello);
console.log(e);

e.dispatchEvent('clic');
e.removeEventListener('clic', bye);

e.dispatchEvent('clic');

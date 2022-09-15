// function sum(a) {
//   return (b) => {
//     return (c) => {
//       return a + b + c;
//     };
//   };
// }

// console.log(sum(1)(2)(3));

//write a curried function that takes infinite args

// function infiniteCurry(...outerArgs) {
//   return function (...innerArgs) {
//     const allArgs = [...outerArgs, ...innerArgs];

//     return allArgs.reduce((total, current) => total + current, 0);
//   };
// }

// console.log(infiniteCurry(1)(2, 3, 4));

// function sumInfiniteArgs(outerArg) {
//   return function (innerArg) {
//     if (innerArg) {
//       return sumInfiniteArgs(outerArg + innerArg);
//     }
//     return outerArg;
//   };
// }

// // console.log(sumInfiniteArgs(1)(1)());
// console.log(sumInfiniteArgs(1)());

//convert func(a,b,c) into func(a)(b)(c)

// function singleArg(fn){
// 	return function(...args){
// 		if(args.length === 1){
// 			return fn(args[0]);
// 		}
// 		return singleArg(args.slice(1));
// 	}
// }

// function curry(func) {
//   // args takes arguments in the form of array eg - [a, b, c]
//   return function curriedFunc(...args) {
//     //check if current args passed equals the number of args function expects
//     if(args.length >= func.length) {
//       // if yes, we spread args elements to pass into func (spread). This is our base case.
//       return func(...args)
//     } else {
//       /* if not, we return a function that collects the next arguments passed in next and
//       we recursively call curriedFunc, accumulating and spreading the values of args first and then
//       the values of next. next will take into consideration a variable amount of next arguments
//       e.g (1, 2) (1) (1,2,3) */
//       return function(...next) {
//         return curriedFunc(...args,...next);
//       }
//     }
//   }
// }

// const join = (a, b, c) => {
//    return `${a}_${b}_${c}`
// }
// const curriedJoin = curry(join)

// // curriedJoin(1, 2, 3) // '1_2_3'

// // curriedJoin(1)(2, 3) // '1_2_3'

// curriedJoin(1, 2)(3) // '1_2_3'

// function operate(op) {
//   return function (a) {
//     return function (b) {
//       switch (op) {
//         case '+':
//           return a + b;
//         case '-':
//           return a - b;
//         case '*':
//           return a * b;
//         case '/':
//           return a / b;

//         default:
//           return 'Unhandled operation!';
//       }
//     };
//   };
// }

// console.log(operate('/')(10)(5));

// function nCurry(outerArg) {
//   return function (innerArg) {
//     if (innerArg) {
//       return nCurry(outerArg + innerArg);
//     }
//     return outerArg;
//   };
// }
// console.log(nCurry(2)(2)(2)());

// function prefix(title) {
//   return function (name) {
//     console.log(`${title}. ${name}`);
//   };
// }

// const mr = prefix('Mr');
// const mrs = prefix('Mrs');

// mr('Jack');
// mr('Jones');
// mr('Miles');
// mrs('Jill');
// mrs('Hillary');

//convert fn(a,b,c) into fn(a)(b)(c)

//curry till arg length reached
//currying means the bumber of args are equal to the number of functions (?) cross check this def
// function curryConvert(fn) {
//   return function collect(...args) {
//     if (fn.length === args.length) {
//       return fn(...args);
//     }
//     return function (...rest) {
//       // return curryConvert(fn)(...args, ...rest);
//       return collect(...args, ...rest);
//     };
//   };
// }
// const sum = (a, b, c, d) => a + b + c + d;

// const total = curryConvert(sum);

// console.log(total(2)(2)(2)(2));

//curried with placeholder support
function curry(func) {
  return function curried(...args) {
    // we need to return a function to make it curry-able.

    // 1. If the arguments are extra then eliminate them
    // we don't want to pass 6 arguments when the expected is 3.
    // it will interfere with our placeholder logic
    const sanitizedArgs = args.slice(0, func.length);

    // see if placeholder is available in arguments
    const hasPlaceholder = sanitizedArgs.some(
      (arg) => arg == curry.placeholder
    );

    // if no placeholder and arguements are equal to what expected then it is normal function call
    if (!hasPlaceholder && sanitizedArgs.length == func.length) {
      return func.apply(this, sanitizedArgs);
    }

    // else we need to replace placeholders with actual values
    // we call helper function `mergeArgs` for this
    // we pass first and next arguments to helper function
    return function next(...nextArgs) {
      return curried.apply(this, mergeArgs(sanitizedArgs, nextArgs));
    };
  };
}

function mergeArgs(args, nextArgs) {
  let result = [];

  // iterate over args (because we need to replace from it)
  // in each iteration, if we find element == curry.placeholder
  // then we replace that placeholder with first element from nextArgs
  // else we put current element
  args.forEach((arg, idx) => {
    if (arg == curry.placeholder) {
      result.push(nextArgs.shift());
    } else {
      result.push(arg);
    }
  });

  // we merge both, because there might be chance that args < nextArgs
  return [...result, ...nextArgs];
}

curry.placeholder = Symbol();

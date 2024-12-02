'use strict';

const AsyncCalculator = require('./AsyncCalculator.js');

// AsyncCalculator has the following methods
// add(x, y): returns a promise for the sum of x and y
// mult(x, y): returns a promise for the product of x and y
// sqrt(x): returns a promise for the square root of x
//          (raise an error is x is negative)

// We can pass a delay in ms to the constructor to simulate a timeout

const acSlow = new AsyncCalculator(1000);

//
// 1. No output, and we don't know when this finishes. The add method
//    returns a Promise for the sum, not the sum itself
////////////////////////////////////////////////////////////////////////

console.log(acSlow.add(1, 2));  // just prints Promise { ... }, not the result

//
// 2. register a callback that runs when the add Promise completes
//////////////////////////////////////////////////////////////////////

// to get the result, we must chain a then callback
acSlow.add(1, 2).then(sum => {
  console.log(sum);  // prints 3, but not until after the delay
});

console.log('faster than sum.');  // this will print before the prior result

//
// 3. a more involved calculation: 1 + 2 + 3 + 4 + 5
///////////////////////////////////////////////////////////////////

acSlow.add(1, 2).then(sum => {
  return acSlow.add(sum, 3);  // note that we MUST return the value from
  // our then callback that we want to get
  // passed to the next then callback.
}).then(sum => {
  return acSlow.add(sum, 4);  // if the value we return is a Promise, the
  // next then will not be called until the
  // Promise completes, and the value passed
  // to the then callback with be the value
  // the Promise resolved to
}).then(sum => acSlow.add(sum, 5))  // due to short syntax rules, this is
// the same as the two prior longer calls
  .then(sum => {
    console.log(sum);  // prints 15, but not until after 4 * delay
    // (one for each call to add)
  });

console.log('still faster than sum.');  // this will still print before the
// first async result

//
// 4. a calculation that results in an error (sqrt of a negative)
///////////////////////////////////////////////////////////////////

acSlow.mult(2, 4).then(product => acSlow.mult(product, -1))  // multiply by -1 to turn
// the result negative
  .then(negative => acSlow.sqrt(negative))  // can we take the sqrt of a negative?
  .then(maybeResult => {
    console.log({ maybeResult });  // if yes, we'll print here
  }).catch(err => {
    console.log({ err });  // if no, we'll get this error
  });

// the previous chunk will have taken 3 * delay to run (3 mult calls)

// We can use Promise.all([promise1, promise2, ...]) to wait until
// all of the supplied promises are complete. The result passed to
// then will be a list of results in the same or as the list of
// promises.

//
// 5. getting the results from multiple promises
//////////////////////////////////////////////////////////

// find (1 + 2) * (3 + 4)
// we need the sum of 1 and 2, AND the sum of 3 and 4, before we can multiply

Promise.all([acSlow.add(1, 2), acSlow.add(3, 4)])  // these can happen at the same time!
  .then(result => {
    const sum1 = result[0];  // this could be simplified with destructuring
    const sum2 = result[1];
    return acSlow.mult(sum1, sum2);
  }).then(result => {
    console.log({ result });
  });

//
// Application
///////////////////////

// Find the longest side of a triangle with sides
// of length 3 and 4

// Use the Pythagorean Theorem: a^2 + b^2 = c^2
// so c = sqrt(a*a + b*b)

const distanceAsync = (a, b) => {
  const ac = new AsyncCalculator();  // no delay, so as fast as possible,
  // but still async

  // TODO: find the distance
};


'use strict';

class AsyncCalculator {
  constructor(delay) {
    this.delay = delay || 0;
  }

  add(x, y) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(x + y); }, this.delay);
    });
  }

  mult(x, y) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(x * y); }, this.delay);
    });
  }

  sqrt(x) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (x >= 0) {
          resolve(Math.sqrt(x));
        } else {
          reject({ message: 'sqrt argument must not be negative' });
        }
      }, this.delay);
    });
  }
}

module.exports = AsyncCalculator;
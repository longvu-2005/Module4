const calc = require('./calculator');

console.log(`add(10, 5) = ${calc.add(10, 5)}`);
console.log(`subtract(10, 5) = ${calc.subtract(10, 5)}`);
console.log(`multiply(10, 5) = ${calc.multiply(10, 5)}`);
console.log(`divide(10, 5) = ${calc.divide(10, 5)}`);
console.log(`divide(10, 0) = ${calc.divide(10, 0)}`);
const sum = require ('./try');
const {hello} = require('./QAMain');
const {QAMain} = require('./QAMain');

console.log('file');
console.log(hello);

test ('add 2 + 3 to equal 5', ()=> {
  expect(sum(2,3)).toBe(5);
});

test ('expect hello to console.log hello', () => {
  expect(hello()).toBe('hello');
});


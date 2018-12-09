const fs = require('fs');

const steps = {};
const order = [];

fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((input) => input.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin/).slice(1, 3))
  .map(([before, after]) => {
    steps[before] = steps[before] || [];
    steps[after] = steps[after] || [];
    steps[after].push(before);
  });

do {
  const next = Object.keys(steps)
    .filter((step) => steps[step].length === 0)
    .filter((step) => !order.includes(step))
    .sort()[0];
  order.push(next);
  Object.keys(steps).forEach((step) => {
    steps[step] = steps[step].filter((item) => item !== next);
  });
} while(order.length < Object.keys(steps).length);

console.log(order.join(''));

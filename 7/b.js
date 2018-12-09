const fs = require('fs');

const steps = {};
const order = [];
let processing = [];
let workers = [0, 0, 0, 0, 0];
let time = 0;

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

  processing = processing.filter((task) => {
    if (task.until === time) {
      order.push(task.task);
      Object.keys(steps).forEach((step) => {
        steps[step] = steps[step].filter((item) => item !== task.task);
      });
      return false;
    }
    return true;
  });

  const available = Object.keys(steps)
    .filter((step) => steps[step].length === 0)
    .filter((step) => !order.includes(step))
    .filter((step) => !processing.find((task) => task.task === step))
    .sort();

  workers = workers.map((worker, index) => {
    if (worker <= time && available.length) {
      const task = available.shift();
      const until = time + task.charCodeAt(0) - 64 + 60;
      processing.push({task, until, worker: index});
      return until;
    }
    return worker;
  });
  time = Math.max(time + 1, Math.min(...processing.map((task) => task.until)));
} while(order.length < Object.keys(steps).length);

console.log(Math.max(...workers));

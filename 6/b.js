const fs = require('fs');

let coo = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line, index) => {
    const c = line.split(', ');
    return {
      index,
      x: ~~c[0],
      y: ~~c[1],
    };
  });

function distance(point1, point2) {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

function isAMatch(x, y) {
  const dist = coo.map((c) => distance(c, {x, y}));
  return dist.reduce((s, v) => s + v) <= 10000;
}

const maxX = Math.max(...coo.map((c) => c.x));
const maxY = Math.max(...coo.map((c) => c.y));

let size = 0;

for (let x = -maxX; x <= 2 * maxX; x++) {
  for (let y = -maxY; y <= 2 * maxY; y++) {
    if (isAMatch(x, y)) {
      size++;
    }
  }
}

console.log(size);
